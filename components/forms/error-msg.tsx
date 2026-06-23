export default function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <p className="text-red-500 text-xs px-2">{children}</p>;
}
