"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const hash_1 = require("../hash");
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    // Inserts seed entries
    await knex("users").insert([
        {
            name: "jacky",
            email: "jackylai96923@gmail.com",
            password: await (0, hash_1.hashPassword)("123"),
        },
        {
            name: "brian",
            email: "brianchan@gmail.com",
            password: await (0, hash_1.hashPassword)("123"),
        },
        {
            name: "kenneth",
            email: "kennethpang@gmail.com",
            password: await (0, hash_1.hashPassword)("123"),
        },
    ]);
}
exports.seed = seed;
