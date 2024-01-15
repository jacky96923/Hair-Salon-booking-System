import express from "express";
import { UserService } from "./userService";
import { UserController } from "./userController";
import { ImageController } from "./imageController";
import { SuggestedController } from "./suggestedController";
import { SuggestedService } from "./suggestedService";
import { GenPhotoController } from "./genPhotoController";
import { knex } from "./main";

export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const suggestedService = new SuggestedService(knex);
export const suggestedController = new SuggestedController(suggestedService);
export const imageController = new ImageController();
export const genPhotoController = new GenPhotoController();
export const userRoutes = express.Router();
export const upload_image = express.Router();
export const get_style = express.Router();
export const genPhoto = express.Router();

userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.post("/booking_category", userController.booking_timeslot)
userRoutes.post("/booking_request", userController.booking_request);
upload_image.post("/upload", imageController.uploadImage);
get_style.get("/suggested", suggestedController.getSuggested);
genPhoto.post("/genPhoto", genPhotoController.sendRequest);
