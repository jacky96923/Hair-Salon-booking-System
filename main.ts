import express from "express";
import { sessionMiddleware } from "./session";
import { join } from "path";

import { isLoggedIn } from "./guards";
import Knex from "knex";


const app = express();
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import { userRoutes } from "./routers";
import { terminalCounter } from "./terminalCounter";

app.use("/", userRoutes);
app.use(terminalCounter)

app.get("/", (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login.html");
        return;
    }
    next();
});

app.use(express.static("public"));
app.use(express.static(join("public", "login")));
app.use("/assets", express.static("assets"));
app.use(isLoggedIn, express.static("hair_preview"));

//app.use("/register", registerRoutes)

//app.use(isLoggedIn, express.static('protected'))

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});
