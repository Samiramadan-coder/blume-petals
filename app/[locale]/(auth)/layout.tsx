export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-10 flex justify-center items-center bg-[url('/images/auth/collection-of-rose.png')] bg-cover bg-no-repeat">
      {children}
    </div>
  );
}
