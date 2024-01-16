import { NextFunction, Request, Response } from "express";
import { Knex } from "knex";

export class MyBookingService {
    constructor(private knex: Knex) {}

    getMyBooking = async (user_id: number) => {
        try {
            return await this.knex("booking").select("datetime", "purpose").where("user_id", user_id)
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}  