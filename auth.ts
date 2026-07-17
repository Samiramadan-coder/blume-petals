import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";

type AppleLoginResponse = {
  success: boolean;
  data: {
    token: string;
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
      if (account?.provider !== "apple" || !account.id_token) {
        return token;
      }

      const name =
        profile?.name ??
        profile?.email ??
        token.name ??
        token.email ??
        "Apple User";

      const response = await fetch(
        `${process.env.API_URL}/api/v1/auth/social/apple`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_token: account.id_token,
            name,
            device_name: "web",
          }),
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Apple backend login failed");
      }

      const result = (await response.json()) as AppleLoginResponse;

      if (!result.success || !result.data?.token) {
        throw new Error("Apple backend token is missing");
      }

      token.backendAccessToken = result.data.token;

      return token;
    },

    async session({ session, token }) {
      (
        session as typeof session & { backendAccessToken?: string }
      ).backendAccessToken = token.backendAccessToken as string;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
