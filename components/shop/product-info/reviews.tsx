import { Rating } from "@/components/ui/rating";
import { ProductDetails } from "@/types/products";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export async function Reviews({
  reviews,
}: {
  reviews: ProductDetails["reviews"];
}) {
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
    <div className="flex gap-20">
      <div>
        <p className="font-semibold text-foreground mb-6">Rating Breakdown</p>
        <div className="space-y-4">
          {reviewsDetails.map((review) => (
            <div className="flex items-center gap-2" key={review.rating}>
              <div className="min-w-24">
                <Rating rating={review.rating} size={review.size} />
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

      <div className="lg:col-span-2 space-y-5">
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
  );
}
