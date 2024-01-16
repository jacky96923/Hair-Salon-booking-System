"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDetailsService = void 0;
class BookingDetailsService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    getBookingDetails = async (user_id) => {
        try {
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    };
}
exports.BookingDetailsService = BookingDetailsService;
