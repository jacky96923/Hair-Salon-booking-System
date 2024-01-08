import express from "express";
import expressSession from "express-session";
import { sessionMiddleware } from "./session";

import { Request, Response } from "express";
import { registerRoutes } from "./registerRoute";

import Knex from 'knex'

const app = express();
let config = require('./knexfile')
export let knex = Knex(config.development)

app.use(sessionMiddleware);

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


app.use(express.static('public'))
//app.use("/register", registerRoutes)

//app.use(isLoggedIn, express.static('protected'))

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
