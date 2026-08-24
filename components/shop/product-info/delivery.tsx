export async function Delivery({ etaText }: { etaText: string }) {
  return (
    <div className="max-w-2xl space-y-5">
      <p
        className="rich-content"
        dangerouslySetInnerHTML={{ __html: etaText }}
      ></p>
    </div>
  );
}
