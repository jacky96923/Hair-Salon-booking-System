"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const hash_1 = require("./hash");
class UserService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async login(email, password) {
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
