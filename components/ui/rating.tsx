import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
  count?: number;
  max?: number;
};

export function Rating({ rating, count, max = 5 }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-primary">
        {Array.from({ length: max }).map((_, index) => {
          const filled = rating >= index + 1;
          const half = rating > index && rating < index + 1;

          return (
            <span key={index} className="relative inline-flex">
              <Star size={16} className="text-primary" />

              {(filled || half) && (
                <Star
                  size={16}
                  className="absolute inset-0 fill-current text-primary"
                  style={{
                    clipPath: half ? "inset(0 50% 0 0)" : "none",
                  }}
                />
              )}
            </span>
          );
        })}
      </div>

      {typeof count === "number" && (
        <span className="ms-2 text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
