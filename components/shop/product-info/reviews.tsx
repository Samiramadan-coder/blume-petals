import { Suspense } from "react";
import { http } from "@/lib/http";
import { Pagination } from "@/types/shared";
import { Rating } from "@/components/ui/rating";
import { ProductDetails } from "@/types/products";
import { getTranslations } from "next-intl/server";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import NoDataFounded from "@/components/reusable/no-data-founded";
import ProductReviewsSkeleton from "../skeleton/product-reviews-skeleton";
import PaginationTemplate from "@/components/reusable/pagination-template";

const ratingBreakdown = {
  "5": 0,
  "4": 0,
  "3": 0,
  "2": 0,
  "1": 0,
};

async function ReviewsData({
  slug,
  reviewCurrentPage,
}: {
  slug: string;
  reviewCurrentPage?: string;
}) {
  const t = await getTranslations("Shop");

  const { data, ok } = await http.get<{
    data: {
      items: ProductDetails["reviews"];
      pagination: Pagination;
      rating_breakdown: {
        [key: string]: number;
      };
    };
  }>(`/api/v1/products/${slug}/reviews`, {
    params: {
      per_page: 5,
      page: reviewCurrentPage || "1",
    },
  });

  console.log("Reviews data:", data);

  if (!ok) {
    throw new Error("Failed to fetch product reviews");
  }

  return (
    <>
      {data.data.items.length === 0 ? (
        <NoDataFounded />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-14 mb-6">
            <div>
              <p className="font-semibold text-foreground mb-6">
                {t("RatingBreakdown")}
              </p>
              <div className="flex flex-col-reverse gap-4">
                {Object.entries(ratingBreakdown).map(([key, value]) => {
                  return (
                    <div className="flex items-center gap-2" key={key}>
                      <div className="min-w-24">
                        <Rating rating={+key} size={14} />
                      </div>
                      <span className="text-xs">{value}</span>
                      <Progress
                        value={(value / data.data.pagination.total) * 100}
                        className="h-2 w-60 bg-[#e6ddd6] [&>div]:bg-primary"
                      />
                      <span className="text-xs font-semibold">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5 flex-1">
              {data.data.items.map((review, index) => (
                <Card className="border border-border p-0" key={index}>
                  <CardContent className="p-4">
                    <Rating rating={review.rating} size={20} />
                    <p className="text-foreground mb-4 mt-3 ps-2 leading-relaxed text-sm">
                      {review.comment}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">
                        {review.user}
                      </p>
                      <p className="text-xs text-foreground/50 italic">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <PaginationTemplate
            currentPage={data.data.pagination.current_page}
            totalPages={data.data.pagination.last_page}
            pageLabel="reviewPage"
          />
        </>
      )}
    </>
  );
}

export default function Reviews({
  slug,
  reviewCurrentPage,
}: {
  slug: string;
  reviewCurrentPage?: string;
}) {
  return (
    <Suspense key={reviewCurrentPage} fallback={<ProductReviewsSkeleton />}>
      <ReviewsData slug={slug} reviewCurrentPage={reviewCurrentPage} />
    </Suspense>
  );
}
