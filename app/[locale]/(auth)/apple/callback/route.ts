import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/actions";
import fs from "fs";
import path from "path";

function writeRouteLog(title: string, payload: unknown) {
  try {
    const logPath = path.join(process.cwd(), "auth-debug.log");

    fs.appendFileSync(
      logPath,
      `\n\n===== ${new Date().toISOString()} | ${title} =====\n${JSON.stringify(
        payload,
        null,
        2,
      )}`,
    );
  } catch (error) {
    console.error("Failed to write auth-debug.log:", error);
  }
}

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

  try {
    const session = await auth();

    const backendAccessToken = (
      session as {
        backendAccessToken?: string;
      } | null
    )?.backendAccessToken;

    const appUrl = await getAppUrl(request.url);

    writeRouteLog("APPLE CALLBACK ROUTE", {
      locale,
      requestUrl: request.url,
      appUrl,
      hasSession: !!session,
      hasBackendAccessToken: !!backendAccessToken,
      sessionKeys: session ? Object.keys(session) : [],
      backendAccessToken: backendAccessToken ?? null,
    });

    if (!backendAccessToken) {
      writeRouteLog("APPLE CALLBACK NO TOKEN", {
        redirectTo: `/${locale}/login`,
      });

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

    writeRouteLog("APPLE CALLBACK COOKIE SET", {
      redirectTo: `/${locale}`,
      backendAccessToken,
      tokenLength: backendAccessToken.length,
      secure: process.env.NODE_ENV === "production",
      setCookieHeader: response.headers.get("set-cookie"),
      locationHeader: response.headers.get("location"),
    });

    return response;
  } catch (error) {
    writeRouteLog("APPLE CALLBACK ROUTE ERROR", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    throw error;
  }
}
