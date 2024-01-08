// import express, { Request, Response } from "express";
// import { checkPassword } from "./hash";
// import Knex from "knex";

// const knexConfig = require("./knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// export const userRoutes = express.Router();

// userRoutes.post("/login", login);

// async function login(req: Request, res: Response) {
//   try {
//     const { username, password } = req.body;
//     const result = await knex
//       .select("*")
//       .from("users")
//       .where("email", username);

//     const user = result[0];
//     console.log(user);

//     if (!user) {
//       return res.status(401).json({ error: "Wrong Username/Password" });
//     }

//     const match = await checkPassword({
//       plainPassword: password,
//       hashedPassword: user.password,
//     });
//     if (!match) {
//       return res.status(401).json({ error: "Wrong Username/Password" });
//     }
//     if (!req.session) {
//       return res.status(412).json({ error: "Missing request session" });
//     }

//     req.session.user = { id: user.id, username: user.username };

//     return res.redirect("/"); // To the protected page.
//   } catch (error) {
//     res.status(500);
//     res.json({ error: String(error) });
//   }
// }
