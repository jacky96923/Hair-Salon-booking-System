"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
console.log("knex", env_1.env);
let pgConfig = {
    client: "pg",
    connection: {
        database: env_1.env.DB_NAME,
        user: env_1.env.DB_USERNAME,
        password: env_1.env.DB_PASSWORD,
        host: env_1.env.DB_HOST,
        port: env_1.env.DB_PORT,
        multipleStatements: true,
    },
};
const config = {
    development: pgConfig,
    test: pgConfig,
    ci: pgConfig,
    production: pgConfig,
};
module.exports = config;
