import ResetPassword from "@/components/auth/reset-password/reset-password";

type SearchParams = {
  code: string;
  email: string;
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { code, email } = await searchParams;

  return <ResetPassword code={code} email={email} />;
}
