import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// When the web server in front of the app blocks a request (e.g. 403 from its
// rate limiting), it serves its error document by passing `/403.shtml` to this
// app. Left alone, that path matches `app/[locale]` with locale "403.shtml" and
// answers a client-side navigation with a 404 page for a URL that exists.
// A non-RSC response makes the Next.js router fall back to a full page load.
const HOST_ERROR_DOCUMENT = /^\/(\d{3})\.shtml$/;

export default function proxy(request: NextRequest) {
  const errorDocument = HOST_ERROR_DOCUMENT.exec(request.nextUrl.pathname);

  if (errorDocument) {
    return new Response("Request blocked. Please try again in a moment.", {
      status: Number(errorDocument[1]),
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/(\\d{3}\\.shtml)"],
};
