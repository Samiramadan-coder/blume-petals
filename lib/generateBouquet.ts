// import { BuilderFormData } from "@/types/builder-page";
// import { GoogleGenAI } from "@google/genai";

// const MODEL = "gemini-3-pro-image";

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
    throw new Error("Container image is missing");
  }

  const flowers = formData.slots
    .filter(
      (slot) => slot.qty > 0 && slot.image_url?.trim() && slot.name?.trim(),
    )
    .map((slot) => ({
      name: slot.name.trim(),
      qty: slot.qty,
      image_url: slot.image_url.trim(),
    }));

  if (!flowers.length) {
    throw new Error("No flowers selected");
  }

  if (flowers.length > 9) {
    throw new Error(
      "Maximum supported selection is 9 flower types plus the container.",
    );
  }

  const totalStems = flowers.reduce((total, flower) => total + flower.qty, 0);

  const inventoryList = flowers
    .map((flower, index) => {
      return `${index + 1}. ${flower.name} — exactly ${flower.qty} stems`;
    })
    .join("\n");

  const referenceGuide = flowers
    .map((flower, index) => {
      return `
Reference image ${index + 2}
Flower name: ${flower.name}
Allowed quantity: exactly ${flower.qty} stems

This is an exact flower inventory reference.
Preserve exactly:
- flower type
- bloom shape
- petal structure
- color
- foliage
- natural visual identity

Do not reinterpret this flower.
Do not stylize it.
Do not simplify it.
Do not replace it.
Do not transform it into another flower type.
Do not add new buds, fillers, or foliage from your own imagination.
`;
    })
    .join("\n");

  const prompt = `
You are a professional florist and luxury floral arrangement designer.

You will receive:
- Reference image 1: the exact container to use
- Reference images 2 to ${flowers.length + 1}: the exact flower inventory references

Create one single photorealistic floral arrangement image.

Hard constraints. These instructions are mandatory and must be followed exactly.

1. Container preservation
- Reference image 1 is the exact container.
- Preserve its exact shape, color, material, finish, proportions, opening, silhouette, and overall identity.
- Do not replace the container.
- Do not redesign the container.
- Do not change the container style.
- Do not change the container size relationship relative to the flowers.
- Do not generate a different vase or a different vessel.

2. Allowed flower inventory only
- Use only the flower types shown in the supplied flower reference images.
- Use no flower type other than the supplied references.
- Use no foliage type other than the foliage already visible in the supplied flower references.
- Do not add any new flower type.
- Do not add any new foliage type.
- Do not add filler flowers.
- Do not add berries, branches, grass, accessories, ribbon, card, logo, text, or decorative elements.
- Do not introduce any new color that is not already present in the supplied flower references.

3. Exact quantity control
Use exactly and only these flower types and quantities:
${inventoryList}

Total requested stems: exactly ${totalStems} stems.

- The arrangement must not contain more than the allowed quantities.
- The arrangement must not contain fewer than the allowed quantities.
- Do not omit any requested type.
- Do not invent extra stems.
- Do not convert one flower type into another.
- Do not create additional flowers to make the arrangement fuller.
- Fullness must come only from arranging the provided flower types and quantities more professionally.
- If a reference stem naturally includes more than one bloom or a bud, still treat it as one stem of that exact flower reference.
- Do not invent extra flower categories from buds or side blooms.

4. Preserve flower identity strictly
For each flower reference image, preserve exactly:
- the flower species or type
- the bloom shape
- the petal structure
- the color palette
- the foliage style
- the overall visual identity

${referenceGuide}

5. Density and bouquet structure
- Make the arrangement dense, full, luxurious, and professionally composed.
- Eliminate visible empty gaps between flowers.
- Fully cover the container rim and upper neck area with blooms and low foliage so the arrangement looks naturally connected to the container.
- No floral foam, wires, tape, cut stem ends, mechanics, or internal structure may be visible.
- No isolated long stems may stick out on their own.
- No floating flowers.
- Do not leave exposed stems visible in the upper visible arrangement area.
- Stems should be visually hidden behind the flower mass and foliage as much as possible.
- The bouquet mass should feel cohesive, connected, compact, and visually full.
- Increase fullness through tighter flower grouping and better distribution, not by adding unrequested flowers.

6. Composition rules
- Use larger fuller blooms to build the main mass.
- Use medium blooms to connect sections.
- Use smaller blooms only from the supplied flower references to fill gaps.
- Repeat the supplied flower types across more than one area for visual cohesion.
- Keep the design elegantly asymmetrical but visually balanced.
- Create clear height gradation.
- Low flowers near the edges.
- Medium flowers in the inner body.
- A limited number of slightly elevated blooms near the top.
- Keep transitions smooth.
- Keep the arrangement proportional to the container.
- The visible flower portion should be roughly between one and one and a half times the container height when appropriate for the container shape.
- Every raised bloom must connect visually to the main flower mass.
- Avoid abrupt height jumps.
- Avoid overcrowding that destroys flower readability.
- Keep each flower readable while still maintaining density.

7. Photography and framing
- Highly photorealistic
- Premium commercial floral photography
- Soft refined lighting
- Natural colors
- Neutral elegant background
- Slight front angle that shows depth
- Full arrangement visible
- Full container visible
- No cropped edges
- No illustration style

Final instruction
Produce one image only.
Follow the inventory and reference images literally.
Do not change the container.
Do not change the supplied flower types.
Do not change the supplied flower shapes.
Do not add anything from your own imagination.
Do not exceed the selected quantities.
Do not use any flower, foliage, filler, or visual element outside the supplied references.

Strictly avoid:
visible gaps, sparse design, random distribution, imbalance, isolated long stems, exposed stems, floating flowers, equal height everywhere, abrupt height changes, excessive arrangement height, visible foam, visible wires, altered container shape, altered container color, altered flower type, altered petal shapes, altered bloom structure, added flowers, added foliage, added filler, distorted petals, unrealistic sizes, artificial colors, cluttered background, cropped container, cropped arrangement, text, logos, cards, or ribbons.
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
