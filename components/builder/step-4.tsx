import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BuilderFormData } from "@/types/builder-page";
import { generateBouquet } from "@/lib/generateBouquet";
import { ImageIcon, Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function Step4({
  generated_image_url,
  getValues,
  setValue,
}: {
  generated_image_url: string | null;
  getValues: UseFormGetValues<BuilderFormData>;
  setValue: UseFormSetValue<BuilderFormData>;
}) {
  const t = useTranslations("CustomBuilder");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleGenerateBouquet = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setGenerationError(null);

      const result = await generateBouquet(getValues());

      setValue("generated_image_url", result.imageUrl);
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
            {generated_image_url && (
              <Image
                src={generated_image_url}
                alt="Generated bouquet"
                fill
                unoptimized
                className="object-cover"
              />
            )}

            {!generated_image_url && !isGenerating && (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="flex size-14 items-center justify-center rounded-full border bg-background">
                  <ImageIcon className="size-6 text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <p className="font-medium">{t("BouquetPreview")}</p>

                  <p className="text-sm text-muted-foreground">
                    {t("BouquetPreviewDescription")}
                  </p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0">
                {!generated_image_url && (
                  <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                )}

                <div
                  className={
                    generated_image_url
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
                        {t("CreatingYourBouquet")}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("GeneratingYourBouquet")}
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
                {t("Generating")}
              </>
            ) : !generated_image_url ? (
              <>
                <Sparkles />
                {t("GenerateBouquet")}
              </>
            ) : null}
          </Button>

          {generated_image_url && (
            <p className="text-center text-xs text-muted-foreground">
              {t("AIGenerate")}
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
