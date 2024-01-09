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
  secret: "1234",
  resave: true,
  saveUninitialized: true,
});
