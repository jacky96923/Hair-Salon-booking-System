import express from "express";
import expressSession from "express-session";
import { sessionMiddleware } from "./session";

import { Request, Response } from "express";
import { registerRoutes } from "./registerRoute";
import { isLoggedIn } from "./guards";

import Knex from "knex";
import { userRoutes } from "./userRoutes";

const app = express();
let config = require("./knexfile");

app.use("/", userRoutes);

app.use(express.static("public"));
app.use(isLoggedIn, express.static("protected"));

export let knex = Knex(config.development);

app.use(
  expressSession({
    secret: "Haircut",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res, next) => {
  if (!req.session.userid) {
    res.redirect("/login.html");
    return;
  }
  switch (req.session.role) {
    case "user":
      res.redirect("/index.html");
      break;
  }
  next();
});

declare module "express-session" {
  interface SessionData {
    name?: string;
  }
}

app.use(express.static("public"));
//app.use("/register", registerRoutes)

//app.use(isLoggedIn, express.static('protected'))

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
