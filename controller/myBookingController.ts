import { NextFunction, Request, Response } from "express";
import { MyBookingService } from "../service/myBookingService";
import moment from "moment";

export class MyBookingController {
    constructor(private myBookingService: MyBookingService) {}
    
    getMyBooking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.session.user?.id
            const result = await this.myBookingService.getMyBooking(user_id as number)
            console.log(result)
            let myBookings:{bookingId: number, bookingDate: string, bookingTime: string, category: string}[] = []
            for (let booking of result as any[]){
                let bookingDate = moment(booking.datetime).format("YYYY-MM-DD")
                let bookingTime = moment(booking.datetime).format("HH:mm")
                console.log("bookingDate:", bookingDate, "bookingTime:",  bookingTime)
                myBookings.push({bookingId: booking.id, bookingDate: bookingDate, bookingTime: bookingTime, category: booking.purpose})
            }
            console.log("myBookings", myBookings)
            return res.json(myBookings)
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}