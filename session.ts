import expressSession from "express-session";
import { env } from "./env";

type Role = "user";

declare module "express-session" {
  interface SessionData {
    counter: number;
    user: {
      id: number;
      email: string;
    };
  }
}

export let sessionMiddleware = expressSession({
  secret: env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
});
