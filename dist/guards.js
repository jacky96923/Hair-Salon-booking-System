"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
function isLoggedIn(req, res, next) {
    if (req.session?.["user"]) {
        next();
    }
    else {
        res.redirect("/login.html");
    }
}
exports.isLoggedIn = isLoggedIn;
