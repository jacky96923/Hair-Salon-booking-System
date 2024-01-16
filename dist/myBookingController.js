"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBookingController = void 0;
const moment_1 = __importDefault(require("moment"));
class MyBookingController {
    myBookingService;
    constructor(myBookingService) {
        this.myBookingService = myBookingService;
    }
    getMyBooking = async (req, res, next) => {
        try {
            const user_id = req.session.user?.id;
            const result = await this.myBookingService.getMyBooking(user_id);
            //console.log(result)
            let myBookings = [];
            for (let booking of result) {
                let bookingDate = (0, moment_1.default)(booking.datetime).format("YYYY-MM-DD");
                let bookingTime = (0, moment_1.default)(booking.datetime).format("HH:mm");
                //console.log("bookingDate:", bookingDate, "bookingTime:",  bookingTime)
                myBookings.push({ bookingDate: bookingDate, bookingTime: bookingTime, category: booking.purpose });
            }
            //console.log("myBookings", myBookings)
            return res.json(myBookings);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    };
}
exports.MyBookingController = MyBookingController;
