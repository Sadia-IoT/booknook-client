
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { db, client } from "./mongodb";

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: mongodbAdapter(db, { client }),
  account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github"],
  },
},
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
      },
    },
  },

  plugins: [jwt()],
});
