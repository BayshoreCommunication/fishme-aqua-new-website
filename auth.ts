import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface BackendUser {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  role: string;
}

interface BackendSigninResponse {
  data?: {
    user?: BackendUser;
    token?: string;
  };
}

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://fishmeaqua-backend.vercel.app"
).replace(/\/$/, "");
const AUTH_SECRET =
  process.env.WEBSITE_AUTH_SECRET ??
  (process.env.AUTH_SECRET ? `website:${process.env.AUTH_SECRET}` : undefined);

// The website and dashboard can run on different localhost ports while still
// sharing the same cookie domain. Give this app its own complete Auth.js cookie
// namespace so a staff session can never be read as a customer session.
export const { auth, signIn, signOut, handlers } = NextAuth({
  secret: AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "fishme-website.session-token",
    },
    callbackUrl: {
      name: "fishme-website.callback-url",
    },
    csrfToken: {
      name: "fishme-website.csrf-token",
    },
    pkceCodeVerifier: {
      name: "fishme-website.pkce.code-verifier",
    },
    state: {
      name: "fishme-website.state",
    },
    nonce: {
      name: "fishme-website.nonce",
    },
    webauthnChallenge: {
      name: "fishme-website.challenge",
    },
  },
  providers: [
    Credentials({
      id: "customer-credentials",
      name: "Customer",
      credentials: {
        identifier: {
          label: "Email or phone",
          type: "text",
          placeholder: "you@example.com or +8801...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const identifier =
          typeof credentials?.identifier === "string"
            ? credentials.identifier.trim()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!identifier || !password) return null;

        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password }),
            cache: "no-store",
          });

          if (!response.ok) return null;

          const body = (await response.json()) as BackendSigninResponse;
          const user = body.data?.user;
          const accessToken = body.data?.token;

          if (!accessToken || !user?._id || user.role !== "customer") {
            return null;
          }

          const fallbackName = [user.firstName, user.lastName]
            .filter(Boolean)
            .join(" ");

          return {
            id: user._id,
            name: user.name || fallbackName || "Fish Me Aqua Customer",
            email: user.email ?? null,
            image: user.avatar || null,
            accessToken,
            role: "customer" as const,
          };
        } catch (error) {
          console.error("Customer authorization request failed", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.sub ?? "";
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
});
