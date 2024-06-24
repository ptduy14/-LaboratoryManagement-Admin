import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string,
      refresh_token: string,
      hasTokenLocal: boolean,
      userInfo: {
        address: string | null;
        email: string;
        firstName: string;
        id: number;
        lastName: string;
        phone: number | null;
        photo: string | null;
        role: number;
        status: boolean;
        password: string | null
      };
    };
  }

  interface User {}
}

declare module "next-auth/jwt" {
  interface JWT {
    userInfo: {
      role: number
    }
  }
}
