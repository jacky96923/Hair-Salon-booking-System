import express from "express";
import { isLoggedIn } from "./guards";
import { UserService } from "./service/userService";
import { UserController } from "./controller/userController";
import { ImageController } from "./controller/imageController";
import { SuggestedController } from "./controller/suggestedController";
import { SuggestedService } from "./service/suggestedService";
import { GenPhotoController } from "./controller/genPhotoController";
import { knex } from "./main";
import { SaveImageController } from "./controller/saveImageController";
import { SaveImageService } from "./service/saveImageService";
import { GetPreviewService } from "./service/getPreviewService";
import { GetPreviewController } from "./controller/getPreviewController";
import { MyBookingController } from "./controller/myBookingController";
import { MyBookingService } from "./service/myBookingService";
import { BookingDetailsController } from "./controller/bookingDetailsController";
import { BookingDetailsService } from "./service/bookingDetailsService";

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
userRoutes.get("/logout", isLoggedIn, userController.logout)
userRoutes.get("/username", isLoggedIn, userController.getUsername);
userRoutes.post("/booking_timeslot", isLoggedIn, userController.booking_timeslot);
userRoutes.post("/booking_request", isLoggedIn, userController.booking_request);

upload_image.post("/upload", isLoggedIn, imageController.uploadImage);
get_style.get("/suggested", isLoggedIn, suggestedController.getSuggested);
genPhoto.post("/genPhoto", isLoggedIn, genPhotoController.sendRequest);
saveResult.post("/save", isLoggedIn, saveImageController.saveImage);
my_booking.get("/my_booking", isLoggedIn, myBookingController.getMyBooking);
booking_details.get(
  "/booking_details", isLoggedIn, 
  bookingDetailsController.getBookingDetails
);
getGenPhoto.get("/getGenPhoto", isLoggedIn, userController.getGenPhoto);
<<<<<<< HEAD
get_preview.get("/getPreview/:id", isLoggedIn, getPreviewController.getPreview);
removeGenPhoto.delete("/removeGenPhoto", isLoggedIn, userController.removeGenPhoto);
=======
get_preview.get("/getPreview/:id", getPreviewController.getPreview);
removeGenPhoto.delete("/removeGenPhoto", userController.removeGenPhoto);
>>>>>>> 60f6285858b7d55380d064edd7b045ef03784834
