import { http } from "@/lib/http";
import { Flower, Product } from "@/types/products";
import BuilderForm from "@/components/builder/builder-form";
import BuilderHeader from "@/components/builder/builder-header";
import { GiftOptions } from "@/types/builder-page";
import { getTranslations } from "next-intl/server";
import { Design } from "@/types/account";

type SerachParams = {
  designId?: string;
};

export async function generateMetadata() {
  const t = await getTranslations("CustomBuilder");
  return {
    title: t("Title"),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SerachParams>;
}) {
  const { designId } = await searchParams;
  let design;

  // if (designId) {
  //   const { data: designDetails, ok: okDesign } = await http.get<{
  //     data: { design: Design };
  //   }>(`/api/v1/designs/${designId}`);

  //   if (!okDesign) {
  //     throw new Error("Failed to fetch design details");
  //   }

  //   console.log(designDetails);
  //   design = designDetails.data.design;
  // }

  // Fetch templates, flowers, and gift options for the builder page
  const { data: templates, ok: ok1 } = await http.get<{
    data: {
      items: Product[];
    };
  }>(`/api/v1/products?made_to_order=1`);

  // Fetch flowers for the builder page
  const { data: flowers, ok: ok2 } = await http.get<{
    data: {
      items: Flower[];
    };
  }>(`/api/v1/builder/flowers`);

  // Fetch gift options for the builder page
  const { data: giftOptions, ok: ok3 } = await http.get<{
    data: GiftOptions;
  }>(`/api/v1/gift-options`);

  if (!ok1 || !ok2 || !ok3) {
    throw new Error("Failed to fetch templates, flowers, or gift options");
  }

  return (
    <main className="pb-12">
      <BuilderHeader />
      <BuilderForm
        templates={templates.data.items}
        flowers={flowers.data.items}
        giftOptions={giftOptions.data}
        design={design}
      />
    </main>
  );
}
