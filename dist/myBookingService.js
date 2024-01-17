"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBookingService = void 0;
class MyBookingService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    getMyBooking = async (user_id) => {
        try {
            return await this.knex("booking").select("datetime", "purpose").where("user_id", user_id);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    };
}
exports.MyBookingService = MyBookingService;
