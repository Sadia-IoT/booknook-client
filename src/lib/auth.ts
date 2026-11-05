
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db ,client } from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db,{client}),

  emailAndPassword: {
    enabled: true,
      minPasswordLength: 6,
  },

  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
      },
    },
  },
});
