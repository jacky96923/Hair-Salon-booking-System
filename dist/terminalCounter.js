"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.terminalCounter = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const path_1 = __importDefault(require("path"));
// terminal counter
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
function isMediaExtname(extname) {
    return mediaExtnameList.includes(extname);
}
let terminalCounter = (req, res, next) => {
    let counter = req.session.counter || 0; //counter, the number before the logs
    if (!isMediaExtname(path_1.default.extname(req.url))) {
        //for prevent counting .js/.css/.jpg etc.
        counter++;
        req.session.counter = counter;
    }
    let timestamp = (0, dayjs_1.default)().format("YYYY-MM-DD HH:mm:ss");
    console.log(`[${timestamp}] #${counter} ${req.method} Request ${req.url}`);
    next();
};
exports.terminalCounter = terminalCounter;
