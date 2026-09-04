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

This image is an EXACT product reference.

Use exactly ${flower.qty} stems of this exact flower product.

Do not use more than ${flower.qty}.
Do not use fewer than ${flower.qty}.

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

Do not beautify it into another flower variety.

Do not replace it with a visually similar flower.

Do not create a generic version inspired by this flower.

Repeated stems must clearly look like multiple physical stems of THIS SAME exact flower product.
`,
    )
    .join("\n");

  const prompt = `
You are a professional floral designer specializing in luxurious, modern floral arrangements.

You will receive:

1. Reference image 1 containing the exact vase, vessel, basket, box, tray, bag, or floral container that must be used.
2. Additional reference images containing the exact flower products, foliage, and botanical materials available for the arrangement.

Your task is to create ONE realistic, professional floral arrangement using ONLY the exact supplied container and ONLY the exact supplied flower products.

The reference images are PRODUCT REFERENCES.

They are not loose inspiration.

You must preserve their visual identity with maximum possible fidelity.

==================================================
ABSOLUTE PRIORITY ORDER
==================================================

If any instruction conflicts with another instruction, follow this exact order:

1. Preserve the exact container from reference image 1.
2. Preserve the exact appearance of every supplied flower reference.
3. Use ONLY botanical materials visibly present in the supplied references.
4. Follow the exact requested quantities.
5. Create the densest and most luxurious arrangement possible using only those exact materials.
6. Apply professional florist composition and photography.

Never sacrifice product fidelity for artistic creativity.

==================================================
REFERENCE IMAGE 1 — EXACT CONTAINER
==================================================

Reference image 1 is the EXACT physical container product.

It is immutable.

The final image must contain the SAME container shown in reference image 1.

Do NOT generate a similar container.

Do NOT replace it.

Do NOT redesign it.

Do NOT reinterpret it.

Do NOT improve it.

Do NOT alter it to fit the flowers.

Preserve exactly:

- original silhouette
- original shape
- original height
- original width
- original proportions
- original neck
- original opening
- original rim
- original base
- original curves
- original material
- original transparency or opacity
- original surface texture
- original finish
- original color
- original patterns
- original decorative details
- original visible reflections
- original perspective
- original camera angle

Do not make the container:

- wider
- narrower
- taller
- shorter
- rounder
- flatter
- more cylindrical
- more tapered
- more decorative
- smoother
- rougher
- more glossy
- more matte
- more transparent
- less transparent

Glass must remain glass.

Ceramic must remain ceramic.

Metal must remain metal.

Transparent material must remain transparent.

Opaque material must remain opaque.

The container is a FIXED PRODUCT ASSET.

The flowers must adapt around the container.

If the floral composition conflicts with preserving the container, adjust the FLOWERS.

Never adjust the container.

The final result must look as if the exact physical container from reference image 1 was photographed after flowers were physically arranged inside it.

==================================================
FLOWER REFERENCES
==================================================

${flowerReferences}

==================================================
EXACT FLOWER QUANTITY
==================================================

Total requested quantity:

EXACTLY ${totalFlowers} stems.

The final arrangement must contain exactly ${totalFlowers} requested flower stems.

Use every requested flower type.

Follow every requested quantity exactly.

Do not add extra stems.

Do not remove requested stems.

Do not duplicate a flower beyond its requested quantity.

==================================================
CRITICAL FLOWER IMAGE PRESERVATION
==================================================

Every supplied flower image is an EXACT commercial product reference.

The flowers in the final image must look like physical stems of those exact supplied products.

The task is to ARRANGE the supplied flowers.

The task is NOT to redesign them.

For every flower preserve with maximum possible fidelity:

- exact flower species appearance
- exact bloom silhouette
- exact bloom proportions
- exact petal structure
- exact petal shape
- exact petal arrangement
- exact flower center
- exact characteristic color
- exact color distribution
- exact gradients
- exact foliage appearance
- exact leaf shape
- approximate flower-head size
- distinctive product characteristics

Do NOT:

- redesign flowers
- reinterpret flowers
- stylize flowers
- beautify flowers into different varieties
- simplify flower structures
- exaggerate flower structures
- change bloom morphology
- change petal structure
- change petal shape
- change characteristic flower centers
- change characteristic colors
- transform one flower species into another
- create generic flowers inspired by the reference
- substitute a supplied flower with a similar-looking flower

When multiple stems of one flower are required, generate multiple stems of the SAME exact referenced flower product.

For example:

If 4 stems are requested, show 4 stems that clearly belong to that exact referenced product.

Natural variation is allowed ONLY in:

- position
- stem direction
- slight rotation
- depth
- partial overlap
- minor perspective variation

Natural variation must NOT change the visual identity of the flower.

If changing the viewing angle would require inventing a different flower shape, keep the flower closer to the viewing angle shown in its original reference.

Preserve flower identity over artistic variation.

==================================================
ABSOLUTE MATERIAL RESTRICTION
==================================================

Use ONLY the botanical materials visibly present in the supplied reference images.

Every visible botanical element in the final image must be traceable directly to a supplied reference image.

This includes:

- flowers
- blooms
- leaves
- foliage
- buds
- stems
- greenery
- botanical accessories

Do NOT invent or add:

- filler flowers
- baby's breath
- eucalyptus
- fern
- decorative greenery
- branches
- grass
- small white flowers
- generic foliage
- extra leaves
- extra buds
- unidentified flowers
- generic flowers
- flowers inspired by the references
- similar flower varieties
- botanical materials not supplied

If an element is not visibly present in one of the supplied reference images, it must NOT appear in the final arrangement.

This rule is absolute.

Do not add botanical elements to make the arrangement fuller.

Do not add botanical elements to hide gaps.

Do not add botanical elements for visual balance.

Do not add botanical elements for artistic effect.

If the supplied materials are insufficient for a large dense arrangement, make the arrangement SMALLER and MORE COMPACT.

A smaller arrangement made only from the exact supplied materials is always preferred over a larger arrangement containing invented materials.

==================================================
FLORAL ARRANGEMENT STYLE
==================================================

Create a luxurious, dense, full, modern professional florist arrangement.

The arrangement must feel:

- dense
- full
- luxurious
- cohesive
- clean
- balanced
- professionally constructed
- physically executable in a real flower shop

The flowers must form ONE connected floral mass.

Do not create an airy or sparse arrangement.

Do not leave obvious gaps between flower heads.

Do not leave a large empty center.

Do not leave background visible through large internal holes.

==================================================
CONTAINER RIM AND NECK COVERAGE
==================================================

This is a critical requirement.

The floral mass must begin immediately at the container opening.

Use the requested flowers and ONLY the foliage already visible in their supplied references to create a dense lower floral layer.

The lower flower heads should sit close to the rim.

The flowers should naturally overlap and visually cover the rim and upper neck transition where physically appropriate.

The transition between the container and flowers must appear full and professionally finished.

Do not leave a visible empty zone between the container and the flowers.

Do not leave a bundle of long exposed stems above the container neck.

Do not let the flowers begin far above the opening.

Do not change the container neck to achieve this.

Do not widen the container opening.

Do not shorten the container.

Achieve coverage by repositioning and lowering the requested flowers only.

==================================================
DENSITY
==================================================

Make the arrangement as dense and luxurious as possible using ONLY the exact requested materials.

Minimize visible gaps between neighboring blooms.

The lower third must be especially dense.

The middle must be full and connected.

The upper area may contain limited height variation but must remain visually connected to the main floral mass.

Density must be achieved ONLY through:

- bringing the requested flowers closer together
- lowering flowers closer to the opening
- reducing unnecessary bouquet width
- reducing unnecessary bouquet height
- natural overlap
- front-to-back layering
- stem direction
- compact placement
- foliage already physically present in the flower references

Do NOT create density by:

- adding new flowers
- adding filler flowers
- adding additional greenery
- adding extra leaves
- increasing stem quantities
- changing flowers into larger varieties
- modifying flower morphology

If the supplied quantity cannot support both a large arrangement and a dense arrangement:

PRIORITIZE DENSITY.

Reduce the arrangement's width.

Reduce unnecessary height.

Bring flowers closer together.

Create a smaller, richer, tighter floral mass.

==================================================
PROFESSIONAL DISTRIBUTION
==================================================

Distribute the flowers professionally rather than randomly.

Use the larger, fuller supplied flowers as primary focal points.

Use the medium supplied flowers to visually connect different areas of the composition.

Use smaller supplied flowers only if those smaller flowers are among the provided references.

Use foliage only if it is visibly part of the supplied references.

Repeat flower colors and flower types across multiple areas when appropriate to achieve visual cohesion.

Do not group all large flowers on one side.

Do not cluster all stems of one flower type in a single isolated area unless it is intentionally required by the composition.

Keep the composition visually balanced:

- left to right
- front to back
- lower to upper areas

==================================================
HEIGHT GRADATION
==================================================

Create a deliberate and professional height progression.

Use:

- lower flowers around the outer and front edges
- medium-height flowers through the inner floral mass
- a limited number of prominent elevated flowers

Do not place all flowers at the same height.

Do not create abrupt changes in height.

Do not create excessively long isolated stems.

Every raised flower must visually connect to the main arrangement.

If an elevated flower creates empty space underneath it, lower or reposition that flower.

Do not add filler underneath it.

The highest point must remain proportional to the container size.

As a general rule, the visible floral portion should be approximately one to one-and-a-half times the container height when appropriate.

Adjust according to the container shape.

For wide, low containers:

- favor a horizontal or semi-circular design
- make the floral composition wider than it is tall
- maintain strong density around the opening

For tall containers:

- use a vertically graduated composition
- maintain strong base density
- avoid isolated long stems

==================================================
FLOWER VISIBILITY
==================================================

Keep the distinctive details of each flower visible.

Do not excessively overlap flowers in a way that destroys their recognizable shapes.

Some overlap is required for density.

However, every requested flower type must remain recognizable.

Angle some flowers slightly forward.

Angle some flowers slightly sideways.

Use only a limited number facing upward.

Do not radically rotate flowers if doing so changes their visible identity.

Use positioning and overlap to create depth instead of changing flower anatomy.

==================================================
FOLIAGE
==================================================

Use foliage only as a supporting element.

Only use foliage visibly present in the supplied reference images.

Use it to:

- support the composition
- close small gaps
- connect nearby flowers
- enhance color contrast

Do not let foliage cover the main flowers.

Do not invent foliage.

Do not add separate filler greenery.

==================================================
REALISTIC CONSTRUCTION
==================================================

The arrangement must look physically executable by a professional florist.

The stems must appear naturally inserted into the exact original container.

Hide all internal construction.

Do not show:

- floral foam
- wires
- holders
- internal support systems
- cut stem ends
- artificial mechanics

No floating flowers.

No impossible stem placement.

No disconnected flower heads.

==================================================
INTERNAL ANALYSIS BEFORE GENERATION
==================================================

Before generating the final image, internally analyze:

- available flower types
- requested quantity of every flower
- total requested quantity of exactly ${totalFlowers} stems
- available colors
- relative flower sizes
- flower-head shapes
- foliage available in each reference
- exact container shape
- exact container proportions
- exact container opening
- appropriate arrangement shape
- which supplied flowers should form the base
- which supplied flowers should act as focal flowers
- which supplied flowers should connect areas
- which supplied flowers should be elevated
- how to achieve maximum density without introducing any unprovided material

Do NOT output this analysis as text.

Use it only to construct the final image.

==================================================
FINAL MATERIAL VERIFICATION
==================================================

Before creating the final image, verify every visible botanical element.

For each visible:

- flower
- bloom
- leaf
- foliage element
- bud
- stem
- greenery element

ask:

"Which supplied reference image does this exact element come from?"

If there is no clear supplied reference image for that element:

REMOVE IT.

There must be ZERO unreferenced botanical elements.

==================================================
FINAL FLOWER IDENTITY VERIFICATION
==================================================

Before generating the final image, compare every flower visually to its supplied reference.

If a generated flower does not clearly preserve the identity of its supplied reference:

CORRECT IT.

Do not output a different flower.

Do not output an approximate substitute.

Do not output an invented variety.

==================================================
FINAL QUANTITY VERIFICATION
==================================================

Use exactly these quantities:

${flowerReferences}

TOTAL:

EXACTLY ${totalFlowers} stems.

Do not output this verification as text.

==================================================
FINAL PHOTOGRAPH
==================================================

Generate ONE final image only.

Create a highly photorealistic photograph of the finished floral arrangement.

Photography requirements:

- premium commercial flower-shop photography
- highly photorealistic
- realistic botanical textures
- natural colors
- fine details
- realistic scale
- realistic shadows
- soft luxurious lighting
- refined neutral interior or studio background
- clean composition
- high commercial photography quality

Show:

- the full floral arrangement
- the complete original container

Do not crop the sides of the arrangement.

Do not crop elevated flowers.

Do not crop the container.

Keep the container at the same visible angle and perspective as reference image 1.

Do not rotate it.

Do not generate a new viewing angle for the container.

Create depth through flower placement instead.

==================================================
DO NOT ADD
==================================================

Do not add:

- text
- logos
- cards
- ribbons
- hands
- people
- decorative props
- unrelated objects

unless explicitly supplied and specifically requested.

==================================================
STRICTLY AVOID
==================================================

Strictly avoid:

- visible gaps
- sparse design
- airy arrangement
- random flower distribution
- visual imbalance
- long isolated stems
- floating flowers
- all flowers at equal height
- excessive bouquet height
- excessive bouquet width
- visible floral foam
- visible wires
- visible internal mechanics
- changing the container shape
- changing container proportions
- changing container dimensions
- changing container material
- changing container color
- changing container texture
- changing container opening
- changing container neck
- changing container rim
- replacing the container
- generating a similar container
- changing flower morphology
- changing flower species appearance
- changing bloom silhouettes
- changing petal structure
- changing flower centers
- changing flower colors
- generic flower substitutions
- similar but different flower varieties
- invented flower varieties
- invented filler flowers
- unreferenced flowers
- unreferenced foliage
- unreferenced greenery
- unreferenced buds
- unreferenced branches
- additional leaves not shown in the references
- additional flowers added for density
- additional greenery added for density
- artificial repetition patterns
- distorted petals
- unrealistic flower sizes
- artificial colors
- cluttered background
- cropping the container
- cropping the floral arrangement
- unrequested text
- unrequested logos
- unrequested cards
- unrequested ribbons
- unrequested accessories

==================================================
FINAL CRITICAL INSTRUCTION
==================================================

DO NOT CHANGE THE PROVIDED IMAGES' PRODUCT IDENTITIES.

The exact container must remain the same product.

Every flower must remain visually faithful to its exact supplied reference.

Do not invent anything.

Do not add anything that is not supplied.

Use only the requested flower products and the foliage physically visible in their references.

Use exactly the requested quantities.

Create fullness only through professional placement, overlap, lower positioning, and compact composition.

If the arrangement cannot be made sufficiently dense with the supplied quantity, make the arrangement smaller and tighter.

Never compensate by creating additional flowers or foliage.

The final result must look like the exact supplied container was physically filled by a florist using the exact supplied flower products.
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
