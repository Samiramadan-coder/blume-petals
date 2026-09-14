export async function Description({ description }: { description: string }) {
  return (
    <div className="max-w-2xl">
      <div
        className="rich-content leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
}
