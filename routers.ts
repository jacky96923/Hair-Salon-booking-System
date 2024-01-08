import express from "express";
import { UserService } from "./userService";
import { UserController } from "./userController";
import { knex } from "./main";



export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const userRoutes = express.Router();
userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);