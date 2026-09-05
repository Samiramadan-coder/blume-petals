// import { BuilderFormData } from "@/types/builder-page";
// import { GoogleGenAI } from "@google/genai";

// const MODEL = "gemini-3.1-flash-image";

// function getMimeType(url: string): string {
//   const cleanUrl = url.split("?")[0].toLowerCase();

//   if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg")) {
//     return "image/jpeg";
//   }

//   if (cleanUrl.endsWith(".webp")) {
//     return "image/webp";
//   }

//   if (cleanUrl.endsWith(".bmp")) {
//     return "image/bmp";
//   }

//   return "image/png";
// }

// export async function generateBouquet(formData: BuilderFormData) {
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

//   if (!apiKey) {
//     throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is missing");
//   }

//   if (!formData.template_url) {
//     throw new Error("Template image is missing");
//   }

//   const flowers = formData.slots.filter(
//     (slot) => slot.qty > 0 && slot.image_url && slot.name,
//   );

//   if (!flowers.length) {
//     throw new Error("No flowers selected");
//   }

//   // Gemini 3.1 Flash Image يدعم حتى 10 مراجع
//   // 1 base template + 9 flower types
//   if (flowers.length > 9) {
//     throw new Error(
//       "Maximum supported selection is 9 flower types plus the base template.",
//     );
//   }

//   const totalFlowers = flowers.reduce((total, flower) => total + flower.qty, 0);

//   const flowerReferences = flowers
//     .map(
//       (flower, index) => `
// Reference image ${index + 2}
// Flower name: ${flower.name}
// Required quantity: exactly ${flower.qty} stems.
// Do not use more than ${flower.qty} stems.
// Do not use fewer than ${flower.qty} stems.
// `,
//     )
//     .join("\n");

//   const prompt = `
// Using reference image 1 as the exact floral arrangement base template.

// Reference image 1 may be a vase, basket, flower box, wrapped bouquet base, bag, tray, or another floral container or presentation shape.

// Preserve the base template exactly:
// - shape
// - proportions
// - material
// - finish
// - opening or support structure
// - placement and presentation style
// - camera angle

// Total requested flowers: exactly ${totalFlowers} stems.

// The following images are exact flower product references.

// ${flowerReferences}

// Create a professional florist-style floral arrangement using the provided base template and the provided flower references.

// Treat every reference image as an exact product reference, not merely visual inspiration.

// Use every requested flower type.

// Follow the requested quantity for every flower type exactly.

// Each requested flower type must appear in the final arrangement with exactly the requested number of stems.

// Do not use more or fewer stems than requested for any flower type.

// The final arrangement must contain exactly ${totalFlowers} stems in total.

// Do not invent additional flower species.
// Do not replace a requested flower with another flower type.
// Do not omit any requested flower type.

// Preserve from every flower reference:
// - flower type
// - flower color
// - petal shape
// - foliage
// - overall appearance

// Arrangement requirements:
// - arrange the flowers naturally according to the shape of the base template
// - place fuller stems toward the back and center when appropriate
// - place smaller blooms toward the front when appropriate
// - use natural height variation
// - use realistic stem overlap
// - make the flower placement believable for the provided template
// - use natural flower angles
// - turn some flowers slightly to create depth
// - create a balanced professional florist composition
// - avoid overcrowding

// Base template requirements:
// - preserve the exact template
// - do not redesign it
// - preserve its original color
// - preserve its proportions
// - preserve its material
// - preserve its original camera angle

// Photography requirements:
// - photorealistic
// - professional ecommerce product photography
// - clean white studio background
// - soft even studio lighting
// - realistic natural shadows
// - full template visible
// - full floral arrangement visible
// - centered composition
// - no illustration style
// - no text
// - no hands
// - no props
// - no additional objects
// `;

//   const ai = new GoogleGenAI({
//     apiKey,
//   });

//   const input = [
//     {
//       type: "image" as const,
//       uri: formData.template_url,
//       mime_type: getMimeType(formData.template_url),
//     },

//     ...flowers.map((flower) => ({
//       type: "image" as const,
//       uri: flower.image_url,
//       mime_type: getMimeType(flower.image_url),
//     })),

//     {
//       type: "text" as const,
//       text: prompt,
//     },
//   ];

//   try {
//     const interaction = await ai.interactions.create({
//       model: MODEL,
//       input,
//       response_format: {
//         type: "image",
//         mime_type: "image/jpeg",
//         aspect_ratio: "4:5",
//         image_size: "1K",
//       },
//     });

//     const generatedImage = interaction.output_image;

//     if (!generatedImage?.data) {
//       console.error("Gemini response:", interaction);
//       throw new Error("Gemini did not return an image");
//     }

//     const mimeType = generatedImage.mime_type || "image/jpeg";

//     return {
//       imageUrl: `data:${mimeType};base64,${generatedImage.data}`,
//     };
//   } catch (error) {
//     console.error("Bouquet generation failed:", error);

//     throw error instanceof Error
//       ? error
//       : new Error("Failed to generate bouquet");
//   }
// }

import { BuilderFormData } from "@/types/builder-page";
import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-3-pro-image";

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

export async function generateBouquet(formData: BuilderFormData) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is missing");
  }

  if (!formData.template_url) {
    throw new Error("Template image is missing");
  }

  const flowers = formData.slots.filter(
    (slot) => slot.qty > 0 && slot.image_url && slot.name,
  );

  if (!flowers.length) {
    throw new Error("No flowers selected");
  }

  const totalFlowers = flowers.reduce((total, flower) => total + flower.qty, 0);

  const flowerReferences = flowers
    .map(
      (flower, index) => `
==================================================
ALLOWED PRODUCT ${index + 1}
REFERENCE IMAGE ${index + 2}
==================================================

Product name:
${flower.name}

EXACT INVENTORY:
${flower.qty} stems.

Use EXACTLY ${flower.qty} physical stems of this exact referenced product.

This reference image defines the visual identity of this product.

This product is WHITELISTED.

Only this exact product appearance is allowed for these ${flower.qty} stems.

PRESERVE:

- exact flower/product type
- exact bloom silhouette
- exact bloom proportions
- exact petal structure
- exact petal shape
- exact flower center
- exact characteristic color
- exact color distribution
- exact visible foliage style
- exact leaf style
- exact bud style if present
- approximate flower-head size
- distinctive visible characteristics
- the natural structure of one stem as shown in the reference

IMPORTANT STEM INTERPRETATION:

${flower.qty} means exactly ${flower.qty} physical product stems.

If one referenced stem naturally contains multiple blooms, buds, leaves, or florets,
preserve that natural structure as belonging to ONE stem.

Do NOT turn one stem into multiple additional stems.

Do NOT multiply the product beyond ${flower.qty} stems.

Do NOT reduce it below ${flower.qty} stems.

Do NOT create another flower variety from this product.

Do NOT create another color variation.

Do NOT blend this product with another supplied product.

Do NOT redesign it.

Do NOT reinterpret it.

Do NOT substitute it.

Do NOT create a visually similar replacement.

Do NOT create a generic flower inspired by it.
`,
    )
    .join("\n");

  const inventorySummary = flowers
    .map(
      (flower, index) =>
        `Product ${index + 1}: "${flower.name}" = EXACTLY ${flower.qty} stems`,
    )
    .join("\n");

  const prompt = `
You are a professional luxury floral designer.

Create ONE highly photorealistic commercial floral arrangement.

This task uses a CLOSED PRODUCT INVENTORY.

The supplied reference images are not inspiration.

They are the EXACT products that are physically available.

You are ONLY allowed to arrange those supplied products.

You are NOT allowed to invent, substitute, redesign, expand, or supplement the inventory.

==================================================
NON-NEGOTIABLE PRIORITY ORDER
==================================================

Follow this priority order under ALL circumstances:

1. CLOSED INVENTORY — use only the supplied flower products.
2. EXACT QUANTITIES — use exactly the requested number of stems of each product.
3. EXACT PRODUCT IDENTITY — preserve the appearance of each supplied product.
4. EXACT CONTAINER — preserve reference image 1.
5. HIDE EXPOSED STEMS THROUGH POSITIONING ONLY.
6. CREATE THE DENSEST POSSIBLE ARRANGEMENT USING ONLY THE CLOSED INVENTORY.
7. APPLY PROFESSIONAL FLORIST STYLING.

If any styling instruction conflicts with inventory accuracy:

INVENTORY ACCURACY ALWAYS WINS.

If any density instruction conflicts with exact quantity:

EXACT QUANTITY ALWAYS WINS.

If perfect density would require adding even ONE extra flower, leaf, bud, stem, or foliage element:

DO NOT ADD IT.

A smaller arrangement or a minor unavoidable gap is preferable to adding anything not supplied.

==================================================
REFERENCE IMAGE 1 — LOCKED CONTAINER
==================================================

Reference image 1 is the exact physical container.

The container is LOCKED.

It is immutable.

The final image must contain the SAME exact container product.

Do NOT:

- replace it
- redesign it
- reinterpret it
- improve it
- simplify it
- enlarge it
- reduce it
- change its proportions
- create a similar container

Preserve:

- silhouette
- height
- width
- proportions
- neck
- opening
- rim
- body
- base
- curves
- geometry
- material
- color
- texture
- finish
- transparency or opacity
- decorative details
- visible reflections
- camera angle
- perspective

The flowers must adapt to the container.

The container must never adapt to the flowers.

==================================================
CLOSED FLOWER INVENTORY
==================================================

The following products are the COMPLETE and FINAL botanical inventory:

${inventorySummary}

TOTAL INVENTORY:

EXACTLY ${totalFlowers} physical stems.

There are NO other available flowers.

There are NO other available leaves.

There are NO other available foliage products.

There are NO other available buds.

There are NO other available greenery products.

There are NO hidden additional materials.

Do not assume anything else is available.

==================================================
EXACT PRODUCT REFERENCES
==================================================

${flowerReferences}

==================================================
ABSOLUTE INVENTORY LOCK
==================================================

The final bouquet must contain ONLY products from the whitelist above.

Every physical stem in the final arrangement must map directly to ONE supplied product reference.

Every requested stem must belong to one of the supplied reference images.

There must be ZERO unreferenced product stems.

Do NOT add:

- another flower species
- another flower variety
- another color
- a similar-looking flower
- a decorative flower
- a filler flower
- generic filler
- baby's breath
- eucalyptus
- fern
- grass
- branches
- filler greenery
- decorative greenery
- generic foliage
- additional leaf stems
- additional bud stems
- artificial botanical filler
- any botanical product not explicitly supplied

Even if an additional element would:

- improve density
- improve balance
- hide a gap
- hide a stem
- improve symmetry
- make the bouquet more luxurious
- make the photograph more beautiful

DO NOT ADD IT.

==================================================
NO PRODUCT SUBSTITUTION
==================================================

Never substitute one supplied flower for:

- a similar species
- a similar color
- a similar shape
- a more attractive version
- a more luxurious version
- a fuller version
- a generic approximation

The supplied references define the exact available products.

The final image must preserve their identities.

==================================================
NO MORPHOLOGY INVENTION
==================================================

Do not invent new flower anatomy.

Do not transform:

- one bloom shape into another
- one petal structure into another
- one flower center into another
- one flower species into another
- one color variation into another

Do not hybridize two supplied flowers.

Do not combine characteristics from multiple references into a new flower.

Each product must remain visually identifiable as its own supplied reference.

==================================================
EXACT QUANTITY LOCK
==================================================

Use exactly:

${inventorySummary}

TOTAL:

EXACTLY ${totalFlowers} physical stems.

Do not use ${totalFlowers + 1} stems.

Do not use ${Math.max(totalFlowers - 1, 0)} stems.

Use exactly ${totalFlowers} stems.

For every individual product:

Do NOT use more than the requested quantity.

Do NOT use fewer than the requested quantity.

Do NOT duplicate a stem to improve density.

Do NOT create extra copies in the background.

Do NOT create partially hidden extra stems.

Do NOT create extra flowers behind the visible bouquet.

Do NOT create extra product units merely because they are partially occluded.

The inventory remains exact even in hidden and background areas.

==================================================
IMPORTANT — FOLIAGE IS NOT FREE FILLER
==================================================

Leaves and foliage are NOT an unlimited filler resource.

Do not create additional greenery simply because foliage appears in a flower reference.

Only use foliage as a natural part of the requested stems.

If a referenced flower stem visibly contains attached leaves or foliage:

those natural attached elements may remain part of that stem.

But do NOT:

- multiply the leaves
- create separate extra foliage stems
- create additional greenery
- create extra leaves to hide gaps
- create foliage clusters not belonging to the requested stems

Foliage must remain physically associated with the supplied product stems.

==================================================
DENSITY WITHOUT ADDING MATERIAL
==================================================

Create the densest possible arrangement using ONLY the exact inventory.

Density may come ONLY from:

- bringing requested flowers closer together
- reducing bouquet width
- reducing unnecessary bouquet height
- lowering flowers
- moving flowers inward
- front-to-back layering
- natural overlap
- controlled rotation
- tighter placement
- repositioning the requested stems

Density must NEVER come from:

- adding flowers
- adding leaves
- adding buds
- adding foliage
- adding greenery
- duplicating stems
- increasing flower quantities
- inventing smaller filler flowers
- generating hidden extra flowers
- enlarging flowers unrealistically

If the available products are insufficient for a large bouquet:

MAKE THE BOUQUET SMALLER.

Reduce the overall width.

Reduce the overall height.

Keep the exact inventory.

==================================================
CRITICAL STEM CONCEALMENT
==================================================

Long exposed bare stems should not be visible.

But stem concealment must NEVER introduce new botanical material.

Hide stems ONLY by repositioning the requested products.

Allowed solutions:

- lower the flower
- move the flower inward
- move it deeper into the bouquet
- position an EXISTING requested flower in front of the stem
- use natural overlap between EXISTING requested products
- use foliage already naturally attached to the requested stem
- reduce excessive flower height

Forbidden solutions:

- adding leaves
- adding foliage
- adding filler flowers
- adding greenery
- adding buds
- adding new stems

If hiding a stem perfectly would require inventing new material:

accept minimal stem visibility instead.

Never violate inventory accuracy.

==================================================
RAISED FLOWERS
==================================================

Raised flowers are allowed only when visually connected to the main floral mass.

Do not create flowers floating above the arrangement on long stems.

Do not create isolated green flowers or buds above the bouquet.

If a requested flower is too high:

LOWER THE SAME FLOWER.

Do not create another flower beneath it.

Do not create greenery beneath it.

Do not invent filler beneath it.

==================================================
LOWER FLORAL MASS
==================================================

The floral mass should begin close to the container opening.

The lower third should be compact and visually full.

Place existing requested blooms close to the rim.

Use ONLY the existing requested stems.

Do not generate an artificial foliage collar around the vase.

Do not create extra leaves around the opening.

Do not create new hydrangea, greenery, or filler to cover the rim.

==================================================
COMPOSITION
==================================================

Create a professional, luxurious floral composition.

The arrangement should appear:

- dense
- cohesive
- compact
- balanced
- natural
- commercially realistic

Use professional distribution.

Do not randomly scatter products.

Do not create large isolated clusters unless required by the supplied quantities.

Spread major requested flowers naturally through the composition.

Use:

- low flowers near the container
- medium-height flowers through the central mass
- a small number of slightly elevated flowers

Avoid unnecessary height.

Avoid unnecessary width.

Avoid isolated stems.

==================================================
DO NOT MAKE PRODUCTS FULLER THAN THEY ARE
==================================================

Do not artificially increase the fullness of an individual product.

If a reference stem has a specific amount of:

- blooms
- buds
- leaves
- florets
- foliage

preserve its approximate natural product structure.

Do not multiply these internal elements merely to make the arrangement fuller.

For example:

If a supplied stem has one main bloom,
do not make the same stem contain three main blooms.

If a supplied stem is a spray product with several natural blooms,
preserve the spray structure rather than counting each bloom as a separate stem.

The requested quantity refers to PHYSICAL PRODUCT STEMS.

==================================================
FINAL CLOSED-INVENTORY AUDIT
==================================================

Before generating the final image, internally inspect the arrangement.

For EVERY visible or partially hidden botanical product ask:

1. Which supplied reference does this stem belong to?
2. Is that product included in the whitelist?
3. Does adding this stem exceed the requested quantity?
4. Does its flower shape match the supplied reference?
5. Does its color match the supplied reference?
6. Does its natural foliage match the supplied reference?

If any botanical element cannot be mapped directly to a supplied product:

REMOVE IT.

If any product quantity is too high:

REMOVE THE EXTRA STEM.

If any requested product quantity is too low:

USE THE MISSING REQUESTED STEM.

Do NOT substitute another product.

Do NOT invent another product.

==================================================
FINAL QUANTITY AUDIT
==================================================

The final physical stem inventory must be:

${inventorySummary}

TOTAL:

EXACTLY ${totalFlowers} stems.

No more.

No fewer.

==================================================
FINAL PRODUCT-IDENTITY AUDIT
==================================================

Before output:

Compare each generated flower product against its reference image.

If a flower no longer clearly resembles its supplied reference:

CORRECT THAT SAME FLOWER.

Do NOT replace it with another variety.

Do NOT approximate it using a generic flower.

Do NOT blend it with another reference.

==================================================
FINAL PHOTOGRAPH
==================================================

Generate ONE final image only.

Create premium photorealistic commercial flower-shop photography.

Use:

- realistic botanical textures
- natural colors
- realistic physical scale
- natural shadows
- soft professional lighting
- refined neutral background
- clean framing
- high-end ecommerce photography

Show:

- the complete arrangement
- the complete exact container

Do not crop the container.

Do not crop the upper flowers.

Keep the same container angle and perspective as reference image 1.

==================================================
STRICTLY FORBIDDEN
==================================================

Strictly forbidden:

- unreferenced flowers
- extra flower varieties
- similar substitute flowers
- invented flowers
- extra stems
- hidden extra stems
- background extra stems
- extra foliage
- extra greenery
- extra leaves
- extra buds
- filler flowers
- decorative filler
- generic botanical material
- product hybridization
- changing flower morphology
- changing petal structure
- changing flower centers
- changing characteristic colors
- exceeding any requested quantity
- reducing any requested quantity
- changing the container
- replacing the container
- redesigning the container
- changing container proportions
- long isolated stems
- excessive bouquet height
- excessive bouquet width
- floating flowers
- visible floral foam
- visible wires
- text
- logos
- cards
- ribbons
- hands
- people
- unrelated props

==================================================
FINAL NON-NEGOTIABLE INSTRUCTION
==================================================

THE SUPPLIED REFERENCES ARE A CLOSED INVENTORY.

DO NOT GO OUTSIDE THIS INVENTORY UNDER ANY CIRCUMSTANCES.

Use ONLY the exact flower products supplied.

Use EXACTLY the requested quantity of each supplied product.

Do not add even one additional product stem.

Do not invent even one additional flower variety.

Do not invent filler.

Do not invent greenery.

Do not invent leaves.

Do not invent buds.

Do not modify the supplied products into new varieties.

Do not solve density problems by creating anything new.

If the requested inventory produces a smaller arrangement:

MAKE IT SMALLER.

If a tiny gap is unavoidable:

KEEP THE GAP.

If a stem cannot be completely hidden without adding material:

KEEP THE PRODUCT ACCURATE.

Inventory accuracy and product fidelity are more important than density.

The final photograph must look like a real florist physically received ONLY the supplied ${totalFlowers} stems and the exact supplied container, and created the best possible arrangement using NOTHING ELSE.
`;

  const ai = new GoogleGenAI({
    apiKey,
  });

  const input = [
    {
      type: "image" as const,
      uri: formData.template_url,
      mime_type: getMimeType(formData.template_url),
    },

    ...flowers.map((flower) => ({
      type: "image" as const,
      uri: flower.image_url,
      mime_type: getMimeType(flower.image_url),
    })),

    {
      type: "text" as const,
      text: prompt,
    },
  ];

  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input,
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

      throw new Error("Gemini did not return an image");
    }

    const mimeType = generatedImage.mime_type || "image/jpeg";

    return {
      imageUrl: `data:${mimeType};base64,${generatedImage.data}`,
    };
  } catch (error) {
    console.error("Bouquet generation failed:", error);

    throw error instanceof Error
      ? error
      : new Error("Failed to generate bouquet");
  }
}
