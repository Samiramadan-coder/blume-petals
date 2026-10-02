import { GoogleGenAI } from "@google/genai";
import type { Flower } from "@/types/products";
import type { BuilderFormData } from "@/types/builder-page";

// const MODEL = "gemini-3-pro-image";

const MODEL = "gemini-3.1-flash-image";

// 1 container + 9 floral items
const MAX_FLORAL_ITEMS = 9;

const IMAGE_CHECK_TIMEOUT = 15000;

export type BouquetGenerationErrorCode =
  | "missing_api_key"
  | "missing_container"
  | "no_flowers"
  | "flower_unavailable"
  | "invalid_image"
  | "too_many_flowers"
  | "no_image_returned"
  | "request_failed";

export class BouquetGenerationError extends Error {
  code: BouquetGenerationErrorCode;

  constructor(code: BouquetGenerationErrorCode, message: string) {
    super(message);
    this.name = "BouquetGenerationError";
    this.code = code;
  }
}

export type BouquetAssets = {
  containerUrl: string;
  items: { qty: number; imageUrl: string }[];
};

function getMimeType(url: string): string {
  const cleanUrl = url.split("?")[0].toLowerCase();

  if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (cleanUrl.endsWith(".webp")) {
    return "image/webp";
  }

  if (cleanUrl.endsWith(".bmp")) {
    return "image/bmp";
  }

  return "image/png";
}

// Gemini fetches the images itself, so they must be absolute http(s) URLs
function isRemoteImageUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);

    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

// Make sure the URL really resolves to an image before paying for a generation
function assertImageLoads(url: string): Promise<void> {
  if (typeof Image === "undefined") return Promise.resolve();

  return new Promise((resolve, reject) => {
    const image = new Image();

    const fail = () =>
      reject(
        new BouquetGenerationError(
          "invalid_image",
          `Image could not be loaded: ${url}`,
        ),
      );

    const timeout = setTimeout(fail, IMAGE_CHECK_TIMEOUT);

    image.onload = () => {
      clearTimeout(timeout);
      resolve();
    };

    image.onerror = () => {
      clearTimeout(timeout);
      fail();
    };

    image.src = url;
  });
}

/* Resolve the current selection against the catalog and keep only what Gemini needs */
export function resolveBouquetAssets(
  formData: BuilderFormData,
  catalog: Flower[],
): BouquetAssets {
  const containerUrl = formData.template_url?.trim();

  if (!containerUrl) {
    throw new BouquetGenerationError(
      "missing_container",
      "Container image is missing",
    );
  }

  if (!isRemoteImageUrl(containerUrl)) {
    throw new BouquetGenerationError(
      "invalid_image",
      `Container image URL is not valid: ${containerUrl}`,
    );
  }

  // One entry per image, so the same asset is never sent twice
  const items = new Map<string, number>();

  for (const slot of formData.slots) {
    if (!(slot.qty > 0)) continue;

    const flower = catalog.find((flower) => flower.id === slot.variant_id);

    if (!flower) {
      throw new BouquetGenerationError(
        "flower_unavailable",
        `Selected flower ${slot.variant_id} is not in the builder catalog`,
      );
    }

    // The catalog image is the source of truth, not the copy stored in the slot
    const imageUrl = flower.image_url?.trim();

    if (!imageUrl || !isRemoteImageUrl(imageUrl)) {
      throw new BouquetGenerationError(
        "invalid_image",
        `Selected flower ${slot.variant_id} has no valid image`,
      );
    }

    items.set(imageUrl, (items.get(imageUrl) ?? 0) + slot.qty);
  }

  if (!items.size) {
    throw new BouquetGenerationError("no_flowers", "No flowers selected");
  }

  if (items.size > MAX_FLORAL_ITEMS) {
    throw new BouquetGenerationError(
      "too_many_flowers",
      `Maximum supported selection is ${MAX_FLORAL_ITEMS} flower types plus the container.`,
    );
  }

  return {
    containerUrl,
    items: Array.from(items, ([imageUrl, qty]) => ({ imageUrl, qty })),
  };
}

/*
  Build the Gemini input.

  Catalog names are deliberately NOT sent: a name is a second, weaker description
  of the asset, and when it disagrees with the photo (a "rose" that is really a
  hydrangea) Gemini draws the name. The photo is the only description of an asset.
  Every image is preceded by its own label so the model cannot mix up the order.
*/
export function buildBouquetInput({ containerUrl, items }: BouquetAssets) {
  const totalUnits = items.reduce((total, item) => total + item.qty, 0);
  const itemIds = items.map((_, index) => `F${index + 1}`);
  const itemList = itemIds.join(", ");
  const single = items.length === 1;

  const rules = `
You are compositing a product photo of a floral arrangement from a closed set of supplied visual assets.

You will receive ${items.length + 1} reference photos, each one introduced by its own label:
- CONTAINER: the exact container.
- ${itemList}: the ${single ? "only floral item" : `only ${items.length} floral items`} that exist for this arrangement.

RULE 1 - CLOSED ASSET SET
Use ONLY the supplied visual assets: the CONTAINER and ${itemList}.
If an element is not visible in the provided assets, it MUST NOT appear in the output.
There is no other flower, bud, leaf, greenery, grass, filler, berry, branch, ribbon, wrapping, paper, card, tag, text, logo, prop or decoration available to you. You cannot add what you do not have.
The finished arrangement contains exactly ${items.length} ${single ? "kind" : "kinds"} of floral item, never ${items.length + 1}. Anything that does not match one of the ${items.length} reference ${single ? "photo" : "photos"} is an invented item.

RULE 2 - THE PHOTO IS THE ONLY DESCRIPTION OF AN ASSET
The labels are neutral ids. Do not guess a species or a "typical" look for an item. Reproduce what the photo shows and nothing else:
- the same kind of bloom or plant, with the same shape and structure
- the same colours, exactly as photographed
- only the leaves and stems that are attached to that item in its own photo
Do not turn an item into a different flower. Do not recolour, tint, brighten or shift the hue of an item. Do not create colour variants, extra buds, or variations that are not visible in its photo. Do not open a bloom further or reveal parts of it (centres, stamens) that its photo does not show.
Do not merge two items into a hybrid, and do not simplify an item into a different plant when the arrangement is crowded.
The output may only contain colours that are visible on the CONTAINER or on ${itemList}. No other colour may appear on any flower, leaf or stem.
Colours do not travel between assets: the colour of the CONTAINER or of one item must never tint another item.

RULE 3 - WHAT IS NOT AN ASSET
A reference photo may also show things that are not part of the item: a hand holding it, a price tag, printed text, a logo, a watermark, a backdrop. Ignore them. Never reproduce them.

RULE 4 - REPETITION IS HOW THE ARRANGEMENT GETS FULL
ALLOWED: repeat the supplied floral items as many times as needed.
FORBIDDEN: invent anything new to fill space.
Density must be achieved by repeating supplied items, not by inventing new ones.
Each label states how many units of that item were selected. One unit is the item as its photo shows it. Use at least that many units, keep that mix between the items, and if a gap remains, fill it with one more copy of a supplied item.
`;

  const task = `
TASK
Create one photorealistic photo of a single floral arrangement: the floral items ${itemList} arranged in the CONTAINER.

Selected mix (${totalUnits} units in total):
${items.map((item, index) => `- ${itemIds[index]}: ${item.qty}`).join("\n")}
${single ? `\nOnly one floral item was supplied, so the whole arrangement is made of ${itemIds[0]} repeated. Do not add a second kind of flower or any greenery for variety.\n` : `\nEvery supplied item must be clearly visible. Do not drop an item and do not replace it with something else.\n`}
Container
- Keep the CONTAINER exactly as photographed: same shape, colour, material, finish and proportions. Do not redesign or replace it.

Arrangement
- Dense, full and professionally composed, with no empty gaps. Fill every gap by repeating ${itemList}.
- Cover the container opening with the supplied items themselves.
- Natural height variation, realistic overlap, balanced composition. Every item stays recognisable as its reference photo.
- Hide stem ends and mechanics. No floating or isolated stems.

Photo
- Plain, seamless, uniform white studio background. Nothing else in the scene: no table objects, no props, no scenery, no hands, no text.
- Soft even studio lighting with a natural shadow under the container.
- Whole container and whole arrangement visible, centred, not cropped.
- True-to-reference colours. No colour grading that shifts the colours of the assets.

FINAL CHECK - apply before producing the image
1. Count the different kinds of floral item in the image. There must be exactly ${items.length}, and each one must match its reference photo: ${itemList}.
   Every flower, leaf and stem in the image is a copy of ${itemList}. If something is not, remove it and put a copy of a supplied item in its place.
2. Every colour in the arrangement is visible in the reference photo of the item it belongs to. If a colour is not, correct it to the reference.
3. Nothing was invented: no extra flower type, no extra greenery or filler, no ribbon, wrapping or accessory, no background element.
4. Use ONLY the supplied visual assets. Repeat them; never invent.
`;

  return [
    { type: "text" as const, text: rules },

    { type: "text" as const, text: "CONTAINER - the exact container:" },
    {
      type: "image" as const,
      uri: containerUrl,
      mime_type: getMimeType(containerUrl),
    },

    ...items.flatMap((item, index) => [
      {
        type: "text" as const,
        text: `${itemIds[index]} - floral item ${index + 1} of ${items.length}, selected units: ${item.qty} of ${totalUnits}. Reproduce exactly as photographed:`,
      },
      {
        type: "image" as const,
        uri: item.imageUrl,
        mime_type: getMimeType(item.imageUrl),
      },
    ]),

    { type: "text" as const, text: task },
  ];
}

export async function generateBouquet(
  formData: BuilderFormData,
  catalog: Flower[],
) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new BouquetGenerationError(
      "missing_api_key",
      "NEXT_PUBLIC_GEMINI_API_KEY is missing",
    );
  }

  const assets = resolveBouquetAssets(formData, catalog);

  await Promise.all(
    [assets.containerUrl, ...assets.items.map((item) => item.imageUrl)].map(
      assertImageLoads,
    ),
  );

  const ai = new GoogleGenAI({
    apiKey,
  });

  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input: buildBouquetInput(assets),
      response_format: {
        type: "image",
        mime_type: "image/jpeg",
        aspect_ratio: "4:5",
        image_size: "1K",
      },
    });

    const generatedImage = interaction.output_image;

    if (!generatedImage?.data) {
      console.error("Gemini response:", interaction);
      throw new BouquetGenerationError(
        "no_image_returned",
        "Gemini did not return an image",
      );
    }

    const mimeType = generatedImage.mime_type || "image/jpeg";

    return {
      imageUrl: `data:${mimeType};base64,${generatedImage.data}`,
    };
  } catch (error) {
    console.error("Bouquet generation failed:", error);

    throw error instanceof BouquetGenerationError
      ? error
      : new BouquetGenerationError(
          "request_failed",
          error instanceof Error ? error.message : "Failed to generate bouquet",
        );
  }
}
