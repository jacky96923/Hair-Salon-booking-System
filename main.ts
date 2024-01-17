import express from "express";
import { sessionMiddleware } from "./session";
import Knex from "knex";

const app = express();
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import {
  userRoutes,
  upload_image,
  get_style,
  genPhoto,
  saveResult,
  getGenPhoto,
  get_preview,
} from "./routers";
import { terminalCounter } from "./terminalCounter";

app.use("/", userRoutes);
app.use("/", upload_image);
app.use("/", get_style);
app.use("/", genPhoto);
app.use("/", saveResult);
app.use("/", getGenPhoto);
app.use("/", get_preview);

app.use(terminalCounter);

app.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login/login.html");
    return;
  }
  next();
});

app.use(express.static("public"));
app.use(express.static("result_images"));
app.use(express.static("hair_styles"));
// app.use(express.static(join("public", "login")));
app.use("/assets", express.static("assets"));
// app.use(isLoggedIn, express.static("hair_preview"));

//app.use("/register", registerRoutes)

//app.use(isLoggedIn, express.static('protected'))

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
