import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Rating } from "@/components/ui/rating";
import { ProductDetails } from "@/types/products";
import { getTranslations } from "next-intl/server";

export async function Reviews({
  reviews,
}: {
  reviews: ProductDetails["reviews"];
}) {
  const tCommon = await getTranslations("Common");

  const reviewsDetails: {
    rating: number;
    count: number;
    size: number;
    percentage: number;
  }[] = [
    {
      rating: 5,
      count: 35,
      size: 8,
      percentage: 82,
    },
    {
      rating: 4,
      count: 70,
      size: 10,
      percentage: 50,
    },
    {
      rating: 3,
      count: 60,
      size: 12,
      percentage: 40,
    },
    {
      rating: 2,
      count: 15,
      size: 14,
      percentage: 30,
    },
    {
      rating: 1,
      count: 4,
      size: 16,
      percentage: 15,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <p className="font-semibold text-foreground mb-6">Rating Breakdown</p>

        <div className="space-y-3">
          {reviewsDetails.map((review) => (
            <div className="flex items-center gap-2" key={review.rating}>
              <div className="min-w-20">
                <Rating rating={review.rating} size={review.size} />
              </div>
              <span className="text-xs">{review.rating}</span>
              <Progress
                value={82}
                className="h-2 w-60 bg-[#e6ddd6] [&>div]:bg-[#cbb682]"
              />
              <span className="text-xs">{review.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        {reviews.map((review, index) => (
          <Card className="border border-border p-0" key={index}>
            <CardContent className="p-4">
              <Rating rating={review.rating} />
              <p className="text-foreground mb-4 mt-3 leading-relaxed">
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
  );
}
