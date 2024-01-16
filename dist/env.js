"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPLICATE_API_TOKEN = exports.env = void 0;
const dotenv_1 = require("dotenv");
const populate_env_1 = __importDefault(require("populate-env"));
(0, dotenv_1.config)();
function loadEnv() {
    let env = {
        NODE_ENV: "development",
    };
    console.log("check before populate", env);
    (0, populate_env_1.default)(env, { mode: "halt" });
    console.log("check after populate", env);
    switch (env.NODE_ENV) {
        case "test": {
            const env = {
                PORT: 8080,
                NODE_ENV: "development",
                TEST_DB_HOST: "localhost",
                TEST_DB_PORT: 5432,
                TEST_DB_NAME: "",
                TEST_DB_USERNAME: "",
                TEST_DB_PASSWORD: "",
            };
            (0, populate_env_1.default)(env, { mode: "halt" });
            return {
                ...env,
                DB_HOST: env.TEST_DB_HOST,
                DB_PORT: env.TEST_DB_PORT,
                DB_NAME: env.TEST_DB_NAME,
                DB_USERNAME: env.TEST_DB_USERNAME,
                DB_PASSWORD: env.TEST_DB_PASSWORD,
            };
        }
        case "ci": {
            const env = {
                PORT: 8080,
                NODE_ENV: "development",
                POSTGRES_DB: "",
                POSTGRES_USER: "",
                POSTGRES_PASSWORD: "",
                POSTGRES_HOST: "",
                POSTGRES_PORT: 5432,
            };
            (0, populate_env_1.default)(env, { mode: "halt" });
            return {
                ...env,
                DB_HOST: env.POSTGRES_HOST,
                DB_PORT: env.POSTGRES_PORT,
                DB_NAME: env.POSTGRES_DB,
                DB_USERNAME: env.POSTGRES_USER,
                DB_PASSWORD: env.POSTGRES_PASSWORD,
            };
        }
        case "development":
        case "production": {
            const env = {
                PORT: 8080,
                NODE_ENV: "development",
                DB_HOST: "localhost",
                DB_PORT: 5432,
                DB_NAME: "",
                DB_USERNAME: "",
                DB_PASSWORD: "",
            };
            (0, populate_env_1.default)(env, { mode: "halt" });
            return env;
        }
        default:
            throw new Error("Unknown NODE_ENV: " + env.NODE_ENV);
    }
}
exports.env = loadEnv();
exports.REPLICATE_API_TOKEN = "r8_54aeurjzKAzaYVRMRy6FyHfKYW4m3IE3Gwj2F";
console.log("check check", exports.env);
