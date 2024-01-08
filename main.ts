import express from "express";
import { sessionMiddleware } from "./session";
import { join } from "path";

import { isLoggedIn } from "./guards";
import Knex from "knex";


const app = express();
<<<<<<< HEAD
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

=======
let config = require("./knexfile");
export let knex = Knex(config.development);
>>>>>>> d8fa3db6088da4bae575d5057f8088262ed9da98

app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import { userRoutes } from "./routers";
import { terminalCounter } from "./terminalCounter";

<<<<<<< HEAD
app.use("/", userRoutes);
app.use(terminalCounter)
=======
// app.use(express.static("public"));
// app.use(isLoggedIn, express.static("protected"));

// export let knex = Knex(config.development);

// app.use(
//   expressSession({
//     secret: "Haircut",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
>>>>>>> d8fa3db6088da4bae575d5057f8088262ed9da98

app.get("/", (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login.html");
        return;
    }
    next();
});

<<<<<<< HEAD
=======
app.use("/", userRoutes);

// declare module "express-session" {
//   interface SessionData {
//     name?: string;
//   }
// }

>>>>>>> d8fa3db6088da4bae575d5057f8088262ed9da98
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
