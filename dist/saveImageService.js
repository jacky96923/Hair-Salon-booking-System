"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveImageService = void 0;
class SaveImageService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async saveOutput(result, requestedStyle, userId) {
        try {
            return await this.knex
                .insert({
                user_id: userId,
                filename: result,
                style: requestedStyle,
            })
                .into("image");
        }
        catch (error) {
            console.log("Cannot save to knex:", error);
        }
    }
}
exports.SaveImageService = SaveImageService;
