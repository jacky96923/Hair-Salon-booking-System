import { NextFunction, Request, Response } from "express";
import { Knex } from "knex";

export class BookingDetailsService {
    constructor(private knex: Knex) {}
    getBookingDetails = async (user_id: number) => {
        try {
            
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}  