import { NextFunction, Request, Response } from "express";
import { Knex } from "knex";

export class MyBookingService {
    constructor(private knex: Knex) {}

    getMyBooking = async (user_id: number) => {
        try {
            const booking = await this.knex("booking").select("id", "datetime", "purpose").where("user_id", user_id)
            return booking
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}  