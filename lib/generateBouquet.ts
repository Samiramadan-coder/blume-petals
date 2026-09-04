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

  // Gemini 3.1 Flash Image يدعم حتى 10 مراجع
  // 1 base template + 9 flower types
  if (flowers.length > 9) {
    throw new Error(
      "Maximum supported selection is 9 flower types plus the base template.",
    );
  }

  const totalFlowers = flowers.reduce((total, flower) => total + flower.qty, 0);

  const flowerReferences = flowers
    .map(
      (flower, index) => `
Reference image ${index + 2}
Flower name: ${flower.name}
Required quantity: exactly ${flower.qty} stems.
Do not use more than ${flower.qty} stems.
Do not use fewer than ${flower.qty} stems.
`,
    )
    .join("\n");

  const prompt = `
Using reference image 1 as the exact floral arrangement base template.

Reference image 1 may be a vase, basket, flower box, wrapped bouquet base, bag, tray, or another floral container or presentation shape.

Preserve the base template exactly:
- shape
- proportions
- material
- finish
- opening or support structure
- placement and presentation style
- camera angle

Total requested flowers: exactly ${totalFlowers} stems.

The following images are exact flower product references.

${flowerReferences}

Create a professional florist-style floral arrangement using the provided base template and the provided flower references.

Treat every reference image as an exact product reference, not merely visual inspiration.

Use every requested flower type.

Follow the requested quantity for every flower type exactly.

Each requested flower type must appear in the final arrangement with exactly the requested number of stems.

Do not use more or fewer stems than requested for any flower type.

The final arrangement must contain exactly ${totalFlowers} stems in total.

Do not invent additional flower species.
Do not replace a requested flower with another flower type.
Do not omit any requested flower type.

Preserve from every flower reference:
- flower type
- flower color
- petal shape
- foliage
- overall appearance

Arrangement requirements:
- arrange the flowers naturally according to the shape of the base template
- place fuller stems toward the back and center when appropriate
- place smaller blooms toward the front when appropriate
- use natural height variation
- use realistic stem overlap
- make the flower placement believable for the provided template
- use natural flower angles
- turn some flowers slightly to create depth
- create a balanced professional florist composition
- avoid overcrowding

Base template requirements:
- preserve the exact template
- do not redesign it
- preserve its original color
- preserve its proportions
- preserve its material
- preserve its original camera angle

Photography requirements:
- photorealistic
- professional ecommerce product photography
- clean white studio background
- soft even studio lighting
- realistic natural shadows
- full template visible
- full floral arrangement visible
- centered composition
- no illustration style
- no text
- no hands
- no props
- no additional objects
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
