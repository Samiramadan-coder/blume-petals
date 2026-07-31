import { Rating } from "@/components/ui/rating";
import { ProductDetails } from "@/types/products";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/types/shared";
import PaginationTemplate from "@/components/reusable/pagination-template";
import { Progress } from "@/components/ui/progress";

const reviewsDetails: {
  rating: number;
  count: number;
  percentage: number;
}[] = [
  {
    rating: 5,
    count: 35,
    percentage: 82,
  },
  {
    rating: 4,
    count: 70,
    percentage: 50,
  },
  {
    rating: 3,
    count: 60,
    percentage: 40,
  },
  {
    rating: 2,
    count: 15,
    percentage: 30,
  },
  {
    rating: 1,
    count: 4,
    percentage: 15,
  },
];

export async function Reviews({
  reviews,
  pagination,
}: {
  reviews: ProductDetails["reviews"];
  pagination: Pagination;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-20 mb-6">
        <div>
          <p className="font-semibold text-foreground mb-6">Rating Breakdown</p>
          <div className="space-y-4">
            {reviewsDetails.map((review) => (
              <div className="flex items-center gap-2" key={review.rating}>
                <div className="min-w-24">
                  <Rating rating={review.rating} size={14} />
                </div>
                <span className="text-xs">{review.rating}</span>
                <Progress
                  value={review.percentage}
                  className="h-2 w-60 bg-[#e6ddd6] [&>div]:bg-primary"
                />
                <span className="text-xs font-semibold">{review.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5 flex-1">
          {reviews.map((review, index) => (
            <Card className="border border-border p-0" key={index}>
              <CardContent className="p-4">
                <Rating rating={review.rating} size={20} />
                <p className="text-foreground mb-4 mt-3 leading-relaxed text-base">
                  {review.comment}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{review.user}</p>
                  <p className="text-xs text-foreground/50">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <PaginationTemplate
        currentPage={pagination.current_page}
        totalPages={pagination.last_page}
        pageLabel="reviewPage"
      />
    </>
  );
}
