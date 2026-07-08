import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await cookies()).has("token")) redirect("/");

  return (
    <div
      className={`
        min-h-screen 
        py-10 
        flex 
        justify-center 
        items-center 
        bg-[url('/images/auth/collection-of-rose.png')] 
        bg-cover
        bg-center
        attachment-fixed 
        bg-no-repeat
      `}
    >
      {children}
    </div>
  );
}
