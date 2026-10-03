import { NextRequest } from "next/server";

/**
 * Same-origin proxy for browser API calls made through `lib/http.ts`.
 * The token lives in an HTTP-only cookie, so it's attached here on the server
 * instead of being handed to browser JavaScript.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// Request headers that are safe and meaningful to pass on to the API.
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "content-type",
  "accept-language",
  "user-agent",
];

// Response headers that no longer describe the body once fetch has decoded it,
// plus cookies, which must not be set on this origin by the API.
const SKIPPED_RESPONSE_HEADERS = [
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
  "set-cookie",
];

async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const url = new URL(pathname + search, API_URL);

  const headers = new Headers();
  FORWARDED_REQUEST_HEADERS.forEach((key) => {
    const value = request.headers.get(key);
    if (value) headers.set(key, value);
  });

  const token = request.cookies.get("token")?.value;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const language = request.cookies.get("NEXT_LOCALE")?.value;
  if (language) {
    headers.set("Accept-Language", language);
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    headers.set("X-Forwarded-For", forwardedFor);
  }

  let body: ArrayBuffer | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const buffer = await request.arrayBuffer();
    if (buffer.byteLength > 0) body = buffer;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
  } catch (error) {
    console.error(`API proxy failed: ${request.method} ${pathname}`, error);
    return Response.json({ message: "Bad gateway" }, { status: 502 });
  }

  const responseHeaders = new Headers(response.headers);
  SKIPPED_RESPONSE_HEADERS.forEach((key) => responseHeaders.delete(key));

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as PATCH,
  proxy as DELETE,
};
