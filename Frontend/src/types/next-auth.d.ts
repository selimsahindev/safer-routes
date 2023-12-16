import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: int;
      tenant_id: int;
      type: string;
      name: string;
      surname: string;
      phone: string;
      email: string;
      birthdate: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: int;
      tenant_id: int;
      type: string;
      name: string;
      surname: string;
      phone: string;
      email: string;
      birthdate: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
    token: string;
    tenant: string;
  }
}
