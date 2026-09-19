import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";

type AppleLoginResponse = {
  success: boolean;
  data: {
    token: string;
    user?: unknown;
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
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
    async jwt({ token, account, profile }) {
      /*
       * account موجود وقت Login من Apple فقط.
       * في باقي الطلبات نحافظ على الـ token الموجود.
       */
      if (account?.provider === "apple" && account.id_token) {
        const name =
          typeof profile?.name === "string"
            ? profile.name
            : (profile?.email ?? token.name ?? token.email ?? "Apple User");

        const response = await fetch(
          `${process.env.API_URL}/api/v1/auth/social/apple`,
          {
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
          },
        );

        const result = (await response.json()) as AppleLoginResponse;

        if (!response.ok) {
          console.error("Apple backend login failed:", {
            status: response.status,
            success: result?.success,
          });

          throw new Error("Apple backend login failed");
        }

        if (!result.success || !result.data?.token) {
          console.error("Apple backend token missing");

          throw new Error("Apple backend token is missing");
        }

        token.backendAccessToken = result.data.token;

        console.log("Apple backend token saved:", !!token.backendAccessToken);
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

      console.log("Session backend token:", !!token.backendAccessToken);

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
