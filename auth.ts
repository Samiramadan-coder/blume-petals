import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";

type AppleLoginResponse = {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: unknown;
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  cookies: {
    callbackUrl: {
      name: "__Secure-authjs.callback-url",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },

  providers: [
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },

    async jwt({ token, account, profile }) {
      if (account?.provider === "apple" && account.id_token) {
        const name =
          typeof profile?.name === "string"
            ? profile.name
            : (profile?.email ?? token.name ?? token.email ?? "Apple User");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is missing");
        }

        const response = await fetch(`${apiUrl}/api/v1/auth/social/apple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id_token: account.id_token,
            name,
            device_name: "web",
          }),
          cache: "no-store",
        });

        const result = (await response.json()) as AppleLoginResponse;

        if (!response.ok) {
          throw new Error("Apple backend login failed");
        }

        if (!result?.success || !result.data?.token) {
          throw new Error("Apple backend token is missing");
        }

        token.backendAccessToken = result.data.token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.backendAccessToken) {
        (
          session as typeof session & {
            backendAccessToken?: string;
          }
        ).backendAccessToken = token.backendAccessToken as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

// import NextAuth from "next-auth";
// import Apple from "next-auth/providers/apple";
// import fs from "fs";
// import path from "path";

// type AppleLoginResponse = {
//   success: boolean;
//   message?: string;
//   data?: {
//     token?: string;
//     user?: unknown;
//   };
// };

// function writeAuthLog(title: string, payload: unknown) {
//   try {
//     const logPath = path.join(process.cwd(), "auth-debug.log");

//     fs.appendFileSync(
//       logPath,
//       `\n\n===== ${new Date().toISOString()} | ${title} =====\n${JSON.stringify(
//         payload,
//         null,
//         2,
//       )}`,
//     );
//   } catch (error) {
//     console.error("Failed to write auth-debug.log:", error);
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   debug: true,

//   cookies: {
//     callbackUrl: {
//       name: "__Secure-authjs.callback-url",
//       options: {
//         httpOnly: true,
//         sameSite: "none",
//         path: "/",
//         secure: true,
//       },
//     },
//   },

//   logger: {
//     error(error) {
//       writeAuthLog("AUTH.JS ERROR", {
//         name: error?.name,
//         message: error?.message,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         type: (error as any)?.type,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         cause: (error as any)?.cause,
//         stack: error?.stack,
//       });

//       console.error("AUTH.JS ERROR:", error);
//     },

//     warn(code) {
//       writeAuthLog("AUTH.JS WARN", {
//         code,
//       });

//       console.warn("AUTH.JS WARN:", code);
//     },

//     debug(message, metadata) {
//       console.log("AUTH.JS DEBUG:", message, metadata);
//     },
//   },

//   providers: [
//     Apple({
//       clientId: process.env.AUTH_APPLE_ID!,
//       clientSecret: process.env.AUTH_APPLE_SECRET!,
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       writeAuthLog("REDIRECT CALLBACK", {
//         url,
//         baseUrl,
//       });

//       if (url.startsWith("/")) {
//         return `${baseUrl}${url}`;
//       }

//       if (new URL(url).origin === baseUrl) {
//         return url;
//       }

//       return baseUrl;
//     },

//     async jwt({ token, account, profile }) {
//       try {
//         writeAuthLog("JWT CALLBACK", {
//           provider: account?.provider,
//           hasAccount: !!account,
//           hasIdToken: !!account?.id_token,
//           email: profile?.email ?? token.email ?? null,
//         });

//         if (account?.provider === "apple" && account.id_token) {
//           const name =
//             typeof profile?.name === "string"
//               ? profile.name
//               : (profile?.email ?? token.name ?? token.email ?? "Apple User");

//           const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//           writeAuthLog("APPLE BACKEND REQUEST", {
//             apiUrl,
//             endpoint: apiUrl ? `${apiUrl}/api/v1/auth/social/apple` : null,
//             hasIdToken: !!account.id_token,
//             name,
//           });

//           if (!apiUrl) {
//             throw new Error("NEXT_PUBLIC_API_URL is missing");
//           }

//           const response = await fetch(`${apiUrl}/api/v1/auth/social/apple`, {
//             method: "POST",

//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },

//             body: JSON.stringify({
//               id_token: account.id_token,
//               name,
//               device_name: "web",
//             }),

//             cache: "no-store",
//           });

//           const rawResponse = await response.text();

//           let result: AppleLoginResponse | null = null;

//           try {
//             result = JSON.parse(rawResponse) as AppleLoginResponse;
//           } catch {
//             writeAuthLog("APPLE BACKEND INVALID JSON", {
//               status: response.status,
//               rawResponse,
//             });

//             throw new Error(
//               `Apple backend returned invalid JSON. Status: ${response.status}`,
//             );
//           }

//           writeAuthLog("APPLE BACKEND RESPONSE", {
//             status: response.status,
//             ok: response.ok,
//             result,
//           });

//           if (!response.ok) {
//             throw new Error(
//               `Apple backend login failed: ${response.status} ${JSON.stringify(
//                 result,
//               )}`,
//             );
//           }

//           if (!result?.success || !result.data?.token) {
//             throw new Error(
//               `Apple backend token missing: ${JSON.stringify(result)}`,
//             );
//           }

//           token.backendAccessToken = result.data.token;

//           writeAuthLog("APPLE TOKEN SAVED", {
//             hasBackendAccessToken: !!token.backendAccessToken,
//           });
//         }

//         return token;
//       } catch (error) {
//         writeAuthLog("JWT CALLBACK ERROR", {
//           message: error instanceof Error ? error.message : String(error),
//           stack: error instanceof Error ? error.stack : undefined,
//         });

//         throw error;
//       }
//     },

//     async session({ session, token }) {
//       try {
//         if (token.backendAccessToken) {
//           (
//             session as typeof session & {
//               backendAccessToken?: string;
//             }
//           ).backendAccessToken = token.backendAccessToken as string;
//         }

//         writeAuthLog("SESSION CALLBACK", {
//           hasBackendAccessToken: !!token.backendAccessToken,
//           sessionHasBackendAccessToken: !!(
//             session as {
//               backendAccessToken?: string;
//             }
//           ).backendAccessToken,
//         });

//         return session;
//       } catch (error) {
//         writeAuthLog("SESSION CALLBACK ERROR", {
//           message: error instanceof Error ? error.message : String(error),
//           stack: error instanceof Error ? error.stack : undefined,
//         });

//         throw error;
//       }
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// });
