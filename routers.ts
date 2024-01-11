import express from "express";
import { UserService } from "./userService";
import { UserController } from "./userController";
import { ImageController } from "./imageController";
import { knex } from "./main";

export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const imageController = new ImageController();
export const userRoutes = express.Router();
export const upload_image = express.Router();

userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.post("/booking_request", userController.booking_request);
upload_image.post("/upload", imageController.uploadImage);
