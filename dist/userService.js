"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const hash_1 = require("./hash");
const moment_1 = __importDefault(require("moment"));
class UserService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async login(email, password) {
        //console.log("check login service:", await this.knex.select("*").from("users").where("email", email))
        return await this.knex.select("*").from("users").where("email", email);
    }
    async register(name, email, password) {
        try {
            return await this.knex
                .insert({
                name: name,
                email: email,
                password: await (0, hash_1.hashPassword)(password),
            })
                .into("users")
                .returning("*");
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
    //Promise<{ man_count: number; c_count: number; } | undefined>
    async booking_timeslot(category, dateTime) {
        try {
            if (category === "Haircut Wash Style") {
                return await this.knex
                    .select("man_count", "c_count")
                    .from("roster")
                    .where("datetime", dateTime);
            }
            else if (category === "Style Perming") {
                return await this.knex
                    .select("man_count", "c_count", "p_count")
                    .from("roster")
                    .where("datetime", dateTime);
            }
        }
        catch (error) { }
    }
    async booking_request(user_id, category, datetime, remarks) {
        try {
            if (category === "Haircut Wash Style") {
                await this.knex("booking").insert({
                    user_id: user_id,
                    purpose: category,
                    datetime: datetime,
                    remarks: remarks,
                });
                await this.knex.raw("update roster set c_count = c_count + 1 where datetime = ?", [datetime]);
            }
            else if (category === "Style Perming") {
                await this.knex("booking").insert({
                    user_id: user_id,
                    purpose: category,
                    datetime: datetime,
                    remarks: remarks,
                });
                let momentStartDateTime = (0, moment_1.default)(datetime, "YYYY-MM-DD hh:mm");
                let timeslots = 3;
                for (let j = 0; j < timeslots; j++) {
                    momentStartDateTime.add(j, "hours");
                    await this.knex.raw("update roster set p_count = p_count + 1 where datetime = ?", [datetime]);
                    momentStartDateTime.subtract(j, "hours");
                }
            }
            return;
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
    async getGenPhoto(user_id) {
        try {
            return await this.knex
                .select("filename", "style")
                .from("image")
                .where("user_id", user_id);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
    async removeGenPhoto(user_id) {
        try {
            const result = await this.knex("image").where("user_id", user_id).del();
            return result;
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
    async hasUser(email) {
        try {
            const existingEmail = await this.knex.select("email").from("users");
            return existingEmail.some((user) => user.email === email);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}
exports.UserService = UserService;
