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
