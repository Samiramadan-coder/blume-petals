export async function Description({ description }: { description: string }) {
  return (
    <div className="max-w-2xl space-y-7">
      <div className="space-y-5">
        <div className="text-sm md:text-base leading-relaxed text-foreground/70">
          {description}
        </div>
      </div>
    </div>
  );
}
