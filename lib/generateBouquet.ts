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
REFERENCE IMAGE ${index + 2}

Flower product:
${flower.name}

Required quantity:
EXACTLY ${flower.qty} stems.

Use exactly ${flower.qty} stems of this exact referenced flower product.

Do not use more than ${flower.qty}.
Do not use fewer than ${flower.qty}.

This image is an EXACT product reference.

Preserve with maximum possible visual fidelity:

- exact flower type
- exact bloom silhouette
- exact bloom proportions
- exact petal structure
- exact petal shape
- exact flower center
- exact characteristic color
- exact color distribution
- exact visible foliage
- exact leaf style
- approximate flower-head size
- all distinctive visible characteristics

Do not redesign this flower.
Do not reinterpret this flower.
Do not replace this flower.
Do not create a generic version inspired by it.

Repeated stems must clearly look like physical stems of this SAME referenced flower product.
`,
    )
    .join("\n");

  const prompt = `
You are a professional floral designer specializing in luxurious, modern floral arrangements.

Create ONE highly photorealistic professional floral arrangement.

You must use:

1. The exact container from reference image 1.
2. Only the exact supplied flower products from the remaining reference images.
3. Exactly the requested flower quantities.

The task is to ARRANGE the supplied products.

The task is NOT to redesign the container.

The task is NOT to redesign the flowers.

==================================================
PRIORITY ORDER
==================================================

If any instruction conflicts with another instruction, follow this order:

1. Preserve the exact container.
2. Preserve the exact identity of every supplied flower.
3. Use only supplied botanical materials.
4. Follow exact flower quantities.
5. Keep the arrangement dense and compact.
6. Keep all raised flowers visually connected to the main floral mass.
7. Apply professional florist styling.

==================================================
REFERENCE IMAGE 1 — EXACT CONTAINER
==================================================

Reference image 1 is the exact physical container product.

It is immutable.

The final image must contain the SAME container shown in reference image 1.

Do not create a similar container.
Do not redesign it.
Do not reinterpret it.
Do not replace it.

Preserve exactly:

- silhouette
- height
- width
- proportions
- neck
- opening
- rim
- body shape
- base
- material
- texture
- finish
- color
- transparency or opacity
- decorative details
- visible reflections
- camera angle
- perspective

Do not change the container in any way.

The container is a fixed product asset.

The flowers must adapt to it.

==================================================
FLOWER REFERENCES
==================================================

${flowerReferences}

==================================================
EXACT QUANTITY
==================================================

The final arrangement must contain EXACTLY ${totalFlowers} requested stems.

Use every requested flower type.

Do not add stems.

Do not remove stems.

Do not duplicate flowers beyond the requested quantities.

==================================================
FLOWER IDENTITY
==================================================

Every supplied flower image is an exact commercial product reference.

Preserve every flower with maximum possible visual fidelity.

Preserve:

- flower species appearance
- bloom silhouette
- petal structure
- petal shape
- flower center
- characteristic color
- foliage
- leaf structure
- approximate flower-head size
- distinctive appearance

Do not redesign flowers.

Do not substitute flowers.

Do not turn one flower into another variety.

Do not create generic interpretations.

Natural variation is allowed only in:

- position
- slight rotation
- stem direction
- depth
- overlap
- small perspective changes

Do not change flower morphology.

==================================================
ABSOLUTE MATERIAL RESTRICTION
==================================================

Use ONLY botanical materials visibly present in the supplied reference images.

Do not add:

- filler flowers
- baby's breath
- eucalyptus
- fern
- grass
- decorative branches
- generic foliage
- extra leaves
- extra buds
- unreferenced greenery
- unreferenced flowers

If a botanical element cannot be traced to a supplied reference image, it must not appear.

==================================================
DENSE ARRANGEMENT
==================================================

Create a dense, full, luxurious, compact florist arrangement.

The flowers must form ONE connected floral mass.

The floral mass must begin directly at the container opening.

The lower part must visually cover the rim and upper neck transition using only the supplied flowers and their existing foliage.

There should be:

- minimal visible gaps
- no large internal holes
- no empty center
- no sparse lower area
- no visible bundle of stems between the container and the flowers

If necessary:

- reduce bouquet width
- reduce bouquet height
- bring flowers closer together
- increase natural overlap
- move flowers lower

Do not add extra materials to create density.

==================================================
CRITICAL STEM HEIGHT RULE
==================================================

This is a critical requirement.

Do NOT allow isolated stems to rise far above the main floral mass.

Do NOT create long exposed stems with a flower or bud sitting alone at the top.

Do NOT allow individual flowers to float visually above the bouquet.

Every raised flower must remain visually connected to the main arrangement.

The stem between an elevated flower and the main floral mass should be mostly hidden by surrounding flowers and foliage.

If a flower is positioned too high and its stem becomes visibly isolated:

LOWER THAT FLOWER.

Move it deeper into the arrangement.

Bring the flower head closer to the main floral mass.

Use surrounding requested blooms to visually connect it.

Do NOT solve this by adding new flowers or foliage.

The solution must be repositioning.

==================================================
GREEN OR SMALL RAISED BLOOMS
==================================================

Pay special attention to small green blooms, green ranunculus, buds, and compact elevated flowers.

Do not place them on tall exposed stems above the arrangement.

These smaller green blooms should sit within or just slightly above the main floral mass.

They should feel embedded in the bouquet, not separated from it.

If a small green bloom appears isolated:

- lower it
- move it inward
- shorten the visible stem
- surround it naturally with the requested flowers
- keep it visually connected to the bouquet

Only a very small height difference is allowed.

Do not create tall green stems extending above the bouquet.

==================================================
HEIGHT GRADATION
==================================================

Create professional height variation, but keep the bouquet connected.

Use:

- low flowers around the rim
- medium flowers through the central mass
- only a small number of slightly elevated focal flowers

The majority of flowers should remain within one cohesive height range.

The height transition must be gradual.

Do not create sudden jumps.

Do not create isolated tall flowers.

Do not create long exposed stems.

If a flower creates a visible vertical gap underneath it, lower it.

If the flower is still too high after adjustment, move it inward.

==================================================
MAXIMUM STEM EXPOSURE RULE
==================================================

Visible bare stem length above the main floral mass should be minimal.

The viewer should primarily see:

- flower heads
- foliage
- dense floral layering

Not:

- long vertical stems
- unsupported flowers
- isolated buds

Elevated flowers must look physically supported by the surrounding floral mass.

==================================================
FLOWER DISTRIBUTION
==================================================

Distribute the flowers professionally.

Do not place every stem of one flower type in one isolated group unless necessary.

Spread focal blooms through:

- left
- center
- right

Use natural overlap.

Keep the composition balanced from:

- left to right
- front to back
- low to high

==================================================
BASE FULLNESS
==================================================

The opening and upper neck area must feel full.

Place the lowest requested flowers close to the rim.

Use only their existing foliage.

Do not expose:

- floral foam
- wires
- holders
- cut stem ends
- internal construction

==================================================
DEPTH
==================================================

Create depth through:

- overlap
- layering
- front-to-back positioning
- subtle rotation
- stem direction

Do not create depth by raising flowers too far above the bouquet.

Do not create depth using isolated stems.

==================================================
FINAL STEM CHECK
==================================================

Before generating the final image, internally inspect every raised stem.

For each raised flower ask:

1. Is the flower visually connected to the main floral mass?
2. Is too much bare stem visible?
3. Does the flower appear to float above the bouquet?
4. Would lowering the flower create a more cohesive arrangement?

If too much stem is visible:

LOWER THE FLOWER.

If the flower appears isolated:

MOVE IT INTO THE MAIN MASS.

If a small green flower or bud is standing alone above the bouquet:

LOWER IT SIGNIFICANTLY.

Do not output this analysis as text.

==================================================
MATERIAL CHECK
==================================================

Before generating the final image, verify every visible botanical element.

Every flower, leaf, bud, stem, and foliage element must come from a supplied reference.

If it does not, remove it.

==================================================
QUANTITY CHECK
==================================================

Use exactly these requested quantities:

${flowerReferences}

Total:

EXACTLY ${totalFlowers} stems.

Do not output this check as text.

==================================================
FINAL IMAGE
==================================================

Generate ONE final image only.

Create a highly photorealistic commercial floral product photograph.

Use:

- premium ecommerce photography
- realistic botanical details
- natural colors
- realistic scale
- realistic shadows
- soft luxury lighting
- refined neutral background
- clean composition
- full original container visible
- full arrangement visible

Keep the container at the same angle and perspective as reference image 1.

Do not rotate it.

Do not change it.

==================================================
STRICTLY AVOID
==================================================

Strictly avoid:

- changing the container
- changing flower identity
- changing bloom structure
- generic flower substitutions
- invented flowers
- invented foliage
- extra stems
- sparse design
- large gaps
- empty center
- exposed container opening
- long visible stems
- isolated raised stems
- isolated green stems
- isolated green blooms
- flowers floating above the bouquet
- excessive vertical separation
- large height jumps
- flowers sitting far above the main floral mass
- long unsupported flower stems
- random distribution
- excessive bouquet width
- excessive bouquet height
- visible foam
- visible wires
- text
- logos
- cards
- ribbons
- hands
- people
- props

==================================================
FINAL CRITICAL INSTRUCTION
==================================================

Use the exact original container.

Use only the exact supplied flower products.

Use exactly the requested quantities.

Preserve flower identity.

Keep the bouquet dense and cohesive.

The floral mass must begin directly at the container opening.

Do not allow individual flowers or green blooms to rise on long exposed stems.

Lower isolated raised flowers into the main arrangement.

The final result should look like one dense professional floral mass, not a collection of separate stems.
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
