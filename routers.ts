import express from "express";
import { isLoggedIn } from "./guards";
import { UserService } from "./userService";
import { UserController } from "./userController";
import { ImageController } from "./imageController";
import { SuggestedController } from "./suggestedController";
import { SuggestedService } from "./suggestedService";
import { GenPhotoController } from "./genPhotoController";
import { knex } from "./main";
import { SaveImageController } from "./saveImageController";
import { SaveImageService } from "./saveImageService";
import { GetPreviewService } from "./getPreviewService";
import { GetPreviewController } from "./getPreviewController";
import { MyBookingController } from "./myBookingController";
import { MyBookingService } from "./myBookingService";
import { BookingDetailsController } from "./bookingDetailsController";
import { BookingDetailsService } from "./bookingDetailsService";

export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const suggestedService = new SuggestedService(knex);
export const suggestedController = new SuggestedController(suggestedService);
export const imageController = new ImageController();
export const genPhotoController = new GenPhotoController();
export const saveImageService = new SaveImageService(knex);
export const saveImageController = new SaveImageController(saveImageService);
export const getPreviewService = new GetPreviewService(knex);
export const getPreviewController = new GetPreviewController(getPreviewService);
export const myBookingService = new MyBookingService(knex);
export const myBookingController = new MyBookingController(myBookingService);
export const bookingDetailsService = new BookingDetailsService(knex);
export const bookingDetailsController = new BookingDetailsController(
  bookingDetailsService
);

export const userRoutes = express.Router();
export const upload_image = express.Router();
export const get_style = express.Router();
export const genPhoto = express.Router();
export const saveResult = express.Router();
export const my_booking = express.Router();
export const booking_details = express.Router();
export const getGenPhoto = express.Router();
export const get_preview = express.Router();
export const removeGenPhoto = express.Router();

userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.get("/username", userController.getUsername);
userRoutes.post("/booking_timeslot", userController.booking_timeslot);

userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.post("/booking_timeslot", userController.booking_timeslot);
userRoutes.post("/booking_request", userController.booking_request);
upload_image.post("/upload", imageController.uploadImage);
get_style.get("/suggested", suggestedController.getSuggested);
genPhoto.post("/genPhoto", genPhotoController.sendRequest);
saveResult.post("/save", saveImageController.saveImage);
my_booking.get("/my_booking", myBookingController.getMyBooking);
booking_details.get(
  "/booking_details",
  bookingDetailsController.getBookingDetails
);
getGenPhoto.get("/getGenPhoto", userController.getGenPhoto);
get_preview.get("/getPreview/:id", getPreviewController.getPreview);
removeGenPhoto.delete("/removeGenPhoto", userController.removeGenPhoto);
