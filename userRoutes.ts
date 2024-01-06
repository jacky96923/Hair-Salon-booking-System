import express, { Request, Response } from "express";
import { checkPassword } from "./hash";
import { knex } from "./main";

export const userRoutes = express.Router();
userRoutes.post("/login", login);

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = await knex.raw(
    `SELECT * FROM users WHERE users.username = $1`,
    [username]
  );

  const user = result.rows[0];
  if (!user) {
    return res.status(401).json({ error: "Wrong Username/Password" });
  }

  const match = await checkPassword({
    plainPassword: password,
    hashedPassword: user.password,
  });
  if (!match) {
    return res.status(401).json({ error: "Wrong Username/Password" });
  }
  if (!req.session) {
    return res.status(412).json({ error: "Missing request session" });
  }

  req.session.userid = user.id;

  return res.redirect("/"); // To the protected page.
}
