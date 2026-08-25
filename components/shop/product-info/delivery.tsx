export async function Delivery({ etaText }: { etaText: string }) {
  return (
    <div className="max-w-2xl">
      <div
        className="rich-content text-foreground/70! leading-relaxed"
        dangerouslySetInnerHTML={{ __html: etaText }}
      ></div>
    </div>
  );
}
