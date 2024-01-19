import express from "express";
import { sessionMiddleware } from "./session";
import { terminalCounter } from "./terminalCounter";
import { isLoggedIn } from "./guards";
import Knex from "knex";

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();
app.use(sessionMiddleware);
app.use(terminalCounter);
app.get("/", isLoggedIn);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import {
  userRoutes,
  aiRoutes,
  bookingRoutes,
  uploadImageRoutes,
} from "./routers";

app.use("/", userRoutes);
app.use("/", aiRoutes);
app.use("/", uploadImageRoutes);
app.use("/", bookingRoutes);

app.use(express.static("public"));
app.use(express.static("public/register"));
app.use(express.static("public/login"));

app.use(isLoggedIn, express.static("protected"));
app.use(express.static("result_images"));
app.use(express.static("hair_styles"));
app.use("/assets", express.static("assets"));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
