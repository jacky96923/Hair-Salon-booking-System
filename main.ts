import express from "express";
import { sessionMiddleware } from "./session";
import path, { join } from "path";
import dayjs from "dayjs";
import { isLoggedIn } from "./guards";

import { userRoutes } from "./routers";

const app = express();
<<<<<<< HEAD
let config = require('./knexfile')
export let knex = Knex(config.development)

app.use(sessionMiddleware);
=======
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// terminal counter
app.use(sessionMiddleware);
let mediaExtnameList = [
  ".js",
  ".css",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".ico",
  ".mp3",
  ".mp4",
];
function isMediaExtname(extname: string): boolean {
  return mediaExtnameList.includes(extname);
}
app.use((req, res, next) => {
  let counter = req.session.counter || 0; //counter, the number before the logs
  if (!isMediaExtname(path.extname(req.url))) {
    //for prevent counting .js/.css/.jpg etc.
    counter++;
    req.session.counter = counter;
  }
  let timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] #${counter} ${req.method} Request ${req.url}`);
  next();
});
//terminal counter

app.use("/", userRoutes);

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
>>>>>>> e9caa832845a1df20a13b65dcb3acb62dfbcfa5f

app.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login.html");
    return;
  }
  next();
});

<<<<<<< HEAD
=======
// declare module "express-session" {
//   interface SessionData {
//     name?: string;
//   }
// }

app.use(express.static("public"));
app.use(express.static(join("public", "login")));
app.use("/assets", express.static("assets"));
app.use(isLoggedIn, express.static("hair_preview"));
>>>>>>> e9caa832845a1df20a13b65dcb3acb62dfbcfa5f

//app.use("/register", registerRoutes)

//app.use(isLoggedIn, express.static('protected'))

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
