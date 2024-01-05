import express from "express";
import expressSession from "express-session";
import { Request, Response } from "express";
import { registerRoutes } from "./registerRoute";

import Knex from 'knex'

const app = express();
let config = require('./knexfile')
let knex = Knex(config.development)

app.use(
    expressSession({
      secret: "Haircut",
      resave: true,
      saveUninitialized: true,
    })
);

declare module "express-session" {
    interface SessionData {
      name?: string;
    }
}


app.use(express.static('public'))
//app.use("/register", registerRoutes)

//app.use(isLoggedIn, express.static('protected'))

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});