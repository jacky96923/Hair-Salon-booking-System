import { NextFunction, Request, Response } from "express";
import { BookingDetailsService } from "./bookingDetailsService";
import moment from "moment";

export class BookingDetailsController {
    constructor(private bookingDetailsService: BookingDetailsService) {}
    getBookingDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bookingId = Number(req.query.id)
            let result: any = await this.bookingDetailsService.getBookingDetails(bookingId)
            console.log("Controller result", result)
            let bookingDetails: {category: string, bookingDate: string, bookingTime: string, remarks: string, imageFilename?: string, imageStyle?: string} = 
            {category: "", bookingDate: "", bookingTime: "", remarks: ""}
            bookingDetails.category = result[0].purpose
            bookingDetails.bookingDate = moment(result[0].datetime).format("YYYY-MM-DD")
            bookingDetails.bookingTime = moment(result[0].datetime).format("HH:mm")
            bookingDetails.remarks = result[0].remarks
            if (result.length > 1){
                bookingDetails.imageFilename = result[1].filename
                bookingDetails.imageStyle = result[1].style
            }
            console.log(bookingDetails)
            return res.json(bookingDetails)
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}