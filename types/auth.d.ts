import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
    role: "customer";
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      accessToken: string;
      role: "customer";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    accessToken: string;
    role: "customer";
  }
}
