"use server";

import { cookies } from "next/headers";

/**
 * Save token in HTTP-only cookie for authentication.
 * @param token - The authentication token to be saved in the cookie.
 */
export async function saveToken(token: string) {
  (await cookies()).set("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}
