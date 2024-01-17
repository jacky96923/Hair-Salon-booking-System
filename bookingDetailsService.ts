import { NextFunction, Request, Response } from "express";
import { Knex } from "knex";

export class BookingDetailsService {
    constructor(private knex: Knex) {}
    getBookingDetails = async (booking_id: number): Promise<{datetime: string, remark: string, purpose: string, image_id?: number, filename?: string, style?: string} | unknown> => {
        try {
            //console.log("before select data")
            const bookingDetails = await this.knex("booking").select("datetime", "remarks", "purpose", "image_id").where("id", booking_id)
            console.log(bookingDetails)
            console.log(bookingDetails[0].image_id)
            if (bookingDetails[0].image_id){
                const image = await this.getBookingImage(bookingDetails[0].image_id)
                console.log(image)
                console.log(bookingDetails.concat(image))
                return bookingDetails.concat(image)
            }
            return bookingDetails
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }

    getBookingImage = async (image_id: number) => {
        try {
            return await this.knex("image").select("filename", "style").where("id", image_id)
        } catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}  