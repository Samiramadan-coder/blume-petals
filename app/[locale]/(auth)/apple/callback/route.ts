import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

  if (!backendAccessToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  const cookieStore = await cookies();
  cookieStore.set("token", backendAccessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}
