import { NextFunction, Request, Response } from "express";
import { BookingDetailsService } from "./bookingDetailsService";

export class BookingDetailsController {
    constructor(private bookingDetailsService: BookingDetailsService) {}
    getBookingDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}