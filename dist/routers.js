"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.userController = exports.userService = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = require("./userService");
const userController_1 = require("./userController");
const main_1 = require("./main");
exports.userService = new userService_1.UserService(main_1.knex);
exports.userController = new userController_1.UserController(exports.userService);
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post("/login", exports.userController.login);
exports.userRoutes.post("/register", exports.userController.register);
