export default function PageTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-xl md:text-3xl font-bold text-foreground font-heading">
        {title}
      </h1>
      {children}
    </div>
  );
}
