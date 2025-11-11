import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string; // 👈 Add this line
  }

  interface DefaultSession {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
