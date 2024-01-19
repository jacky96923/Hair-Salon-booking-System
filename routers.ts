import express from "express";
import { knex } from "./main";

import { isLoggedIn } from "./guards";

import { UserService } from "./service/userService";
import { UserController } from "./controller/userController";
import { ImageController } from "./controller/imageController";
import { SuggestedController } from "./controller/suggestedController";
import { SuggestedService } from "./service/suggestedService";
import { GenPhotoController } from "./controller/genPhotoController";
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
export const uploadImageRoutes = express.Router();
export const aiRoutes = express.Router();
export const bookingRoutes = express.Router();

// *****
// User Routes
// *****
userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.get("/logout", isLoggedIn, userController.logout);
userRoutes.get("/username", isLoggedIn, userController.getUsername);

// *****
// Image Upload
// *****
uploadImageRoutes.post("/upload", isLoggedIn, imageController.uploadImage);

// *****
// Faceshape prediction and Haricut Gan
// *****
aiRoutes.get("/suggested", isLoggedIn, suggestedController.getSuggested);
aiRoutes.post("/genPhoto", isLoggedIn, genPhotoController.sendRequest);
aiRoutes.post("/save", isLoggedIn, saveImageController.saveImage);
aiRoutes.get("/getGenPhoto", isLoggedIn, userController.getGenPhoto);
aiRoutes.get("/getStyleImg", isLoggedIn, userController.getStyleImg);
aiRoutes.delete("/removeGenPhoto", isLoggedIn, userController.removeGenPhoto);

// *****
// Booking
// *****
bookingRoutes.get("/booking", isLoggedIn, myBookingController.getMyBooking);
bookingRoutes.get(
  "/bookingDetails",
  isLoggedIn,
  bookingDetailsController.getBookingDetails
);
bookingRoutes.get(
  "/getPreview/:id",
  isLoggedIn,
  getPreviewController.getPreview
);
// get timeslots availability
bookingRoutes.post(
  "/bookingTimeslots",
  isLoggedIn,
  userController.bookingTimeslots
);
// post booking
bookingRoutes.post(
  "/bookingRequest",
  isLoggedIn,
  userController.bookingRequest
);
