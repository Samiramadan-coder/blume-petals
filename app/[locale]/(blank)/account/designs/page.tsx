import { Suspense } from "react";
import { http } from "@/lib/http";
import { Design } from "@/types/account";
import { Pagination } from "@/types/shared";
import { getTranslations } from "next-intl/server";
import Designs from "@/components/account/designs/designs";
import { DesignsSkeleton } from "@/components/account/designs/designs-skeleton";

type SearchParams = {
  page?: string;
};

export async function generateMetadata() {
  const t = await getTranslations("Account");
  return {
    title: t("MyDesigns"),
  };
}

async function DesignsContent({ page }: { page?: string }) {
  const { data, ok } = await http.get<{
    data: {
      items: Design[];
      pagination: Pagination;
    };
  }>("/api/v1/designs", {
    params: {
      page: page ?? 1,
      per_page: 6,
    },
  });

  if (!ok) {
    throw new Error("Failed to fetch designs");
  }

  return <Designs items={data.data.items} pagination={data.data.pagination} />;
}

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await searchParams;

  return (
    <Suspense key={page} fallback={<DesignsSkeleton />}>
      <DesignsContent page={page} />
    </Suspense>
  );
}
