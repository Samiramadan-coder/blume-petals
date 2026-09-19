import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/actions";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      locale: string;
    }>;
  },
) {
  const { locale } = await params;

  const session = await auth();

  const backendAccessToken = (
    session as {
      backendAccessToken?: string;
    } | null
  )?.backendAccessToken;

  const appUrl = await getAppUrl(request.url);

  console.log("Apple callback session:", {
    hasSession: !!session,
    hasBackendAccessToken: !!backendAccessToken,
  });

  if (!backendAccessToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, appUrl));
  }

  const response = NextResponse.redirect(new URL(`/${locale}`, appUrl));

  response.cookies.set({
    name: "token",

    value: backendAccessToken,

    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    path: "/",

    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
