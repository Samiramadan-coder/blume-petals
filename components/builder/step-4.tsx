import { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { ImageIcon, Loader2, RefreshCw, Sparkles } from "lucide-react";

import { BuilderFormData } from "@/types/builder-page";
import { generateBouquet } from "@/lib/generateBouquet";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

export default function Step4({
  getValues,
}: {
  getValues: UseFormGetValues<BuilderFormData>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleGenerateBouquet = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setGenerationError(null);

      const result = await generateBouquet(getValues());

      setGeneratedImage(result.imageUrl);
    } catch (error) {
      console.error(error);

      setGenerationError(
        error instanceof Error ? error.message : "Failed to generate bouquet",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
            {generatedImage && (
              <Image
                src={generatedImage}
                alt="Generated bouquet"
                fill
                unoptimized
                className="object-cover"
              />
            )}

            {!generatedImage && !isGenerating && (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="flex size-14 items-center justify-center rounded-full border bg-background">
                  <ImageIcon className="size-6 text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <p className="font-medium">Bouquet Preview</p>

                  <p className="text-sm text-muted-foreground">
                    Generate your bouquet to preview the selected flowers
                    arranged inside your vase.
                  </p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0">
                {!generatedImage && (
                  <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                )}

                <div
                  className={
                    generatedImage
                      ? "absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm"
                      : "absolute inset-0 flex items-center justify-center"
                  }
                >
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                      <Loader2 className="size-5 animate-spin" />
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium">
                        Creating your bouquet
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Generating your preview...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-4">
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={handleGenerateBouquet}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" />
                Generating...
              </>
            ) : generatedImage ? (
              <>
                <RefreshCw />
                Regenerate Bouquet
              </>
            ) : (
              <>
                <Sparkles />
                Generate Bouquet
              </>
            )}
          </Button>

          {generatedImage && (
            <p className="text-center text-xs text-muted-foreground">
              AI generated preview. The final arrangement may vary slightly.
            </p>
          )}
        </CardFooter>
      </Card>

      {generationError && (
        <Alert variant="destructive">
          <AlertDescription>{generationError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
