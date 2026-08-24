export async function Delivery({ etaText }: { etaText: string }) {
  return (
    <div className="max-w-2xl space-y-5">
      <p className="text-sm text-muted-foreground">{etaText}</p>
    </div>
  );
}
