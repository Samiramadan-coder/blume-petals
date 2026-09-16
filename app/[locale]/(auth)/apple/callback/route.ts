import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/actions";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ locale: string }>;
  },
) {
  const { locale } = await params;
  const session = await auth();
  const backendAccessToken = (session as { backendAccessToken?: string } | null)
    ?.backendAccessToken;
  const appUrl = await getAppUrl(request.url);

  if (!backendAccessToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, appUrl));
  }

  const cookieStore = await cookies();
  cookieStore.set("token", backendAccessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(new URL(`/${locale}`, appUrl));
}
