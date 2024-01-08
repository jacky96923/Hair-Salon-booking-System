import express from "express";
import { UserService } from "./userService";
import { UserController } from "./userController";
import Knex from "knex";

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

export const userRoutes = express.Router();
export const userService = new UserService(knex);
export const userController = new UserController(userService);
userRoutes.post("/login", userController.login);
