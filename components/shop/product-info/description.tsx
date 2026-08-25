export async function Description({ description }: { description: string }) {
  return (
    <div className="max-w-2xl">
      <div
        className="rich-content text-foreground/70 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
}
