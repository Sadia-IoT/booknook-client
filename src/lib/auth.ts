import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { db, client } from "./mongodb";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);
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

  sendResetPassword: async ({ user, url }) => {
    await resend.emails.send({
      from: "BookNook <onboarding@resend.dev>",
      to: user.email,
      subject: "Reset your BookNook Password",
      html: `
        <h2>Password Reset</h2>
        <p>You requested to reset your BookNook password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${url}">Reset Password</a>
      `,
    });
  },
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
