import express from "express";
import { UserService } from "./userService";
import { UserController } from "./userController";
import { ImageController } from "./imgController";
import { knex } from "./main";

export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const userRoutes = express.Router();
export const upload_image = express.Router();
userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
upload_image.post("/upload", imgController.upload_image);
