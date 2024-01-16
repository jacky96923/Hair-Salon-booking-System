"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDetailsController = void 0;
class BookingDetailsController {
    bookingDetailsService;
    constructor(bookingDetailsService) {
        this.bookingDetailsService = bookingDetailsService;
    }
    getBookingDetails = async (req, res, next) => {
        try {
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    };
}
exports.BookingDetailsController = BookingDetailsController;
