"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/types/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ProductImages({
  productImages,
}: {
  productImages: ProductDetails["images"];
}) {
  const initialImageIndex = productImages.findIndex(
    (image) => image.is_primary,
  );
  const [activeImageIndex, setActiveImageIndex] = useState(
    initialImageIndex >= 0 ? initialImageIndex : 0,
  );
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? productImages.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === productImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const openCarousel = (index: number) => {
    setActiveImageIndex(index);
    setIsCarouselOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-4">
          {productImages.slice(0, 4).map((image, index) => (
            <div
              className="relative rounded-xl overflow-hidden cursor-pointer"
              key={image.id}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt || "Product image"}
                width={500}
                height={500}
                className="aspect-square w-full object-cover"
              />

              {productImages.length > 4 && index === 3 && (
                <button
                  type="button"
                  className="absolute inset-0 grid cursor-pointer place-content-center bg-black/40 text-2xl text-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    openCarousel(4);
                  }}
                >
                  + {productImages.length - 4}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="col-span-3 relative group overflow-hidden">
          {productImages[activeImageIndex] && (
            <Image
              src={productImages[activeImageIndex].url}
              alt={productImages[activeImageIndex].alt || "Product image"}
              width={500}
              height={500}
              className="aspect-square w-full object-cover rounded-xl"
            />
          )}
        </div>
      </div>

      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent
          className="max-w-5xl border-0 bg-transparent p-0 shadow-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Product images carousel</DialogTitle>

          <div className="relative overflow-hidden rounded-xl bg-black p-4 sm:p-6">
            {productImages[activeImageIndex] && (
              <Image
                src={productImages[activeImageIndex].url}
                alt={productImages[activeImageIndex].alt || "Product image"}
                width={1200}
                height={1200}
                className="mx-auto max-h-[75vh] w-auto rounded-lg object-contain"
              />
            )}

            {productImages.length > 1 && (
              <>
                <Button
                  type="button"
                  size="icon-sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={showPreviousImage}
                >
                  <ChevronLeft />
                  <span className="sr-only">Previous image</span>
                </Button>

                <Button
                  type="button"
                  size="icon-sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={showNextImage}
                >
                  <ChevronRight />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}

            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {productImages.map((image, index) => (
                <button
                  type="button"
                  key={image.id}
                  className={`overflow-hidden rounded-lg border-2 ${
                    activeImageIndex === index
                      ? "border-white"
                      : "border-transparent opacity-70"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || "Product image"}
                    width={96}
                    height={96}
                    className="size-20 object-cover sm:size-24"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
