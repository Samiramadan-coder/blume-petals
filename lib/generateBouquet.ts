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

const MODEL = "gemini-3.1-flash-image";

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

  if (flowers.length > 9) {
    throw new Error(
      "Maximum supported selection is 9 flower types plus the base template.",
    );
  }

  const totalFlowers = flowers.reduce((total, flower) => total + flower.qty, 0);

  const flowerReferences = flowers
    .map(
      (flower, index) => `
REFERENCE IMAGE ${index + 2}

Product name:
${flower.name}

Required quantity:
EXACTLY ${flower.qty} stems.

This image represents the EXACT flower product that must appear in the final arrangement.

Generate exactly ${flower.qty} physical stems belonging to this same referenced flower product.

Do not use more than ${flower.qty} stems.
Do not use fewer than ${flower.qty} stems.

Do not redesign this flower.
Do not substitute it.
Do not convert it into a similar flower.
Do not change its characteristic bloom shape.
Do not change its characteristic petal structure.
Do not change its characteristic color.
Do not change its characteristic foliage.
`,
    )
    .join("\n");

  const prompt = `
You are a professional florist specializing in luxury modern floral arrangement design.

IMPORTANT:

This task is to ARRANGE the referenced flower products.

This task is NOT to redesign, reinterpret, stylize, beautify, replace, or invent the flowers.

FLOWER REFERENCE FIDELITY IS THE HIGHEST PRIORITY.

You will receive image references in the following order.

REFERENCE IMAGE 1

This image contains the EXACT floral arrangement base template.

It may be:

- a vase
- a ceramic vessel
- a glass vessel
- a basket
- a flower box
- a wrapped bouquet base
- a bag
- a tray
- another floral presentation container

Preserve reference image 1 with maximum possible visual fidelity.

Do not redesign the base.

Preserve:

- exact shape
- exact proportions
- exact color
- exact material
- exact finish
- exact patterns
- exact opening
- exact rim
- exact structure
- exact dimensions relative to the flowers
- exact overall visual identity

${flowerReferences}

TOTAL FLOWER QUANTITY

The final floral arrangement must contain EXACTLY ${totalFlowers} stems in total.

The requested quantities are strict.

Each flower reference must appear with exactly its requested number of stems.

Do not increase quantities.

Do not decrease quantities.

Do not invent extra stems to make the arrangement look fuller.

Do not remove stems to make the arrangement easier to compose.

CRITICAL FLOWER IDENTITY PRESERVATION

Every flower image is an exact commercial product reference.

The final arrangement must look as though physical stems of these exact referenced products were placed into the provided base.

For every flower reference preserve with maximum possible fidelity:

- exact flower species appearance
- exact bloom type
- exact bloom silhouette
- exact bloom proportions
- exact petal structure
- exact petal shape
- exact petal arrangement
- characteristic petal count appearance
- exact flower center structure
- exact color
- exact color distribution
- exact gradients
- exact texture
- exact foliage style
- exact leaf shape
- exact leaf color
- distinctive visual characteristics
- approximate flower-head size relative to the other references

Do not create generic flowers inspired by the references.

Do not create visually similar substitutes.

Do not transform one referenced flower into another variety.

Do not modify flower morphology for artistic purposes.

Do not simplify complicated petal structures.

Do not exaggerate petals.

Do not create additional petals merely to make flowers fuller.

Do not change the characteristic center of the flower.

Do not change the flower species appearance.

Do not turn artificial-looking flowers into a different botanical variety.

REPEATED STEMS

When a reference requires multiple stems, generate multiple stems of the SAME exact referenced flower product.

For example:

If one flower reference requires 4 stems, create 4 stems that clearly belong to the same flower product shown in that reference.

They may vary naturally in:

- position
- stem direction
- slight rotation
- slight perspective
- partial overlap
- depth placement

They must NOT vary in:

- flower type
- bloom morphology
- petal structure
- characteristic bloom shape
- characteristic color
- foliage identity
- species appearance

Repeated flowers must remain clearly recognizable as the same product.

Do not create excessive visual variation between repeated stems.

It is better to repeat a recognizable version of the reference flower than to invent a different-looking version.

VIEWING ANGLES

Keep focal flowers at viewing angles close to their reference images whenever possible.

Use:

- placement
- depth
- stem direction
- overlap
- slight rotation

to create variation.

Do not radically rotate a flower if that requires inventing unseen anatomy.

Do not alter bloom structure merely to create a side view.

If changing the viewing angle conflicts with preserving the reference flower, preserve the reference flower.

REFERENCE PRIORITY

If any instruction conflicts with another instruction, follow this priority:

1. Preserve exact flower identity.
2. Preserve exact base template identity.
3. Follow exact flower quantities.
4. Create a realistic florist arrangement.
5. Apply styling and photography instructions.

Never sacrifice flower identity to make the arrangement more artistic.

Never sacrifice flower identity to make the arrangement more varied.

Never sacrifice flower identity to make the arrangement more symmetrical.

Never sacrifice flower identity to make the arrangement more luxurious.

ARRANGEMENT DESIGN

Create one professional luxury floral arrangement.

Use only the provided flower and foliage references.

Do not introduce additional flower types.

Do not introduce additional colors.

Do not introduce additional foliage.

Make the arrangement:

- dense
- full
- cohesive
- luxurious
- professionally distributed
- visually balanced
- suitable for real execution by a florist

There should be no large visible gaps.

Do not make the arrangement sparse.

Do not make the arrangement look randomly assembled.

Use large blooms as major focal points.

Use medium flowers to visually connect different areas.

Use smaller elements to fill appropriate gaps.

Distribute repeated flower types across the composition where appropriate.

Do not place every stem of one flower type in one isolated cluster unless the design requires it.

Create an elegant asymmetrical composition while maintaining visual balance.

Maintain balance:

- left to right
- front to back
- low to high

HEIGHT STRUCTURE

Create deliberate height variation.

Use:

- lower flowers near edges and front areas
- medium flowers through the central mass
- a limited number of elevated flowers

Do not place all flowers at the same height.

Do not create abrupt height transitions.

Do not create excessively long isolated stems.

Every elevated flower must visually connect to the main arrangement.

Keep the highest point proportional to the base template.

The arrangement must not look:

- too short
- compressed
- excessively tall
- unstable

As a general rule, keep the visible floral height approximately one to one-and-a-half times the base template height when appropriate.

Adapt this according to the shape of the provided base.

If the base is wide and low:

- favor a horizontal or semi-circular arrangement
- make it wider than tall
- keep strong density near the base

If the base is tall:

- use a vertically graduated composition
- maintain density around the opening
- avoid isolated long stems

BASE CONNECTION

The flowers must look physically inserted into the provided base.

There must be believable stem placement.

There must be believable depth.

There must be believable overlap.

Hide:

- floral foam
- wires
- supports
- internal mechanics
- cut stem ends
- artificial construction elements

When appropriate, visually cover the rim or opening with flowers and low-positioned elements.

The arrangement must look naturally connected to the base.

FLOWER VISIBILITY

Keep the distinctive identity of every flower type visible.

Do not hide entire flower types behind others.

Avoid excessive overlap that destroys recognizable flower shapes.

Do not cover primary blooms completely with foliage.

Use foliage only as a supporting element.

Foliage may:

- fill small gaps
- connect visual areas
- support the composition
- enhance color contrast

Foliage must not dominate the arrangement.

INTERNAL ANALYSIS

Before generating the final image, internally analyze:

- every available flower type
- every requested quantity
- every available color
- relative flower sizes
- characteristic bloom structures
- characteristic foliage
- base template shape
- base template proportions
- base template opening
- suitable arrangement geometry
- which flowers should act as focal elements
- which flowers should connect composition areas
- which flowers should remain lower
- which flowers may be elevated
- how to distribute exactly ${totalFlowers} stems

Do not output this analysis as text.

Use it only to construct the final image.

FINAL OUTPUT

Generate ONE final image only.

Do not create multiple design alternatives.

Do not create a collage.

Do not create multiple arrangements in one image.

PHOTOGRAPHY

Create a highly photorealistic commercial product photograph.

Requirements:

- photorealistic
- premium ecommerce floral photography
- fine realistic detail
- natural flower textures
- natural colors
- realistic proportions
- realistic flower scale
- realistic stem placement
- soft professional lighting
- realistic natural shadows
- refined neutral background
- clean environment
- front-facing product presentation
- slight angle only when useful for showing depth
- full arrangement visible
- full base visible
- no cropped elevated flowers
- no cropped base edges
- centered professional composition

DO NOT ADD

- text
- logos
- cards
- ribbons
- hands
- people
- decorative props
- unrelated objects

unless explicitly provided and requested.

STRICTLY AVOID

- changing flower morphology
- changing flower species appearance
- changing characteristic bloom silhouette
- changing petal structure
- noticeably changing petal count
- changing petal arrangement
- changing characteristic flower centers
- changing foliage shape
- changing characteristic flower color
- generic flower substitutions
- creating similar but different flowers
- redesigning referenced flowers
- stylizing referenced flowers
- beautifying flowers into different varieties
- inventing unseen flower anatomy
- excessive variation between repeated stems
- altering flower appearance merely to create different viewing angles
- artificial cloned patterns
- distorted petals
- unrealistic flower sizes
- unrealistic colors
- floating flowers
- visible gaps
- sparse design
- random distribution
- visual imbalance
- long isolated stems
- equal flower heights
- excessive bouquet height
- visible foam
- visible wires
- visible internal mechanics
- altering the base shape
- altering the base material
- altering the base color
- replacing the base
- adding unprovided flowers
- adding unprovided foliage
- adding unprovided colors
- cluttered background
- cropping the base
- cropping the arrangement
- unrequested text
- unrequested logos
- unrequested accessories

FINAL CRITICAL INSTRUCTION

The task is to arrange the referenced flower products, not to redesign or reinterpret them.

Preserve flower identity over artistic variation.
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
