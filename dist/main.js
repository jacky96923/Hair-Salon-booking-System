"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const express_1 = __importDefault(require("express"));
const session_1 = require("./session");
// import { isLoggedIn } from "./guards";
const knex_1 = __importDefault(require("knex"));
const app = (0, express_1.default)();
const knexConfig = require("./knexfile");
exports.knex = (0, knex_1.default)(knexConfig[process.env.NODE_ENV || "development"]);
app.use(session_1.sessionMiddleware);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const routers_1 = require("./routers");
const terminalCounter_1 = require("./terminalCounter");
app.use("/", routers_1.userRoutes);
app.use("/", routers_1.upload_image);
app.use("/", routers_1.get_style);
app.use("/", routers_1.genPhoto);
app.use("/", routers_1.saveResult);
app.use("/", routers_1.getGenPhoto);
app.use("/", routers_1.removeGenPhoto);
app.use(terminalCounter_1.terminalCounter);
app.get("/", (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login/login.html");
        return;
    }
    next();
});
app.use(express_1.default.static("public"));
app.use(express_1.default.static("result_images"));
// app.use(express.static(join("public", "login")));
app.use("/assets", express_1.default.static("assets"));
// app.use(isLoggedIn, express.static("hair_preview"));
//app.use("/register", registerRoutes)
//app.use(isLoggedIn, express.static('protected'))
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});
