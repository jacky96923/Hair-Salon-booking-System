import { config } from "dotenv";
import populateEnv from "populate-env";

config();

function loadEnv() {
  let env = {
    NODE_ENV: "development",
  };
  console.log("check before populate", env);

  populateEnv(env, { mode: "halt" });
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
        TEST_REPLICATE_API_TOKEN: "",
      };
      populateEnv(env, { mode: "halt" });
      return {
        ...env,
        DB_HOST: env.TEST_DB_HOST,
        DB_PORT: env.TEST_DB_PORT,
        DB_NAME: env.TEST_DB_NAME,
        DB_USERNAME: env.TEST_DB_USERNAME,
        DB_PASSWORD: env.TEST_DB_PASSWORD,
        REPLICATE_API_TOKEN: env.TEST_REPLICATE_API_TOKEN,
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
        REPLICATE_API_TOKEN: "",
      };
      populateEnv(env, { mode: "halt" });
      return {
        ...env,
        DB_HOST: env.POSTGRES_HOST,
        DB_PORT: env.POSTGRES_PORT,
        DB_NAME: env.POSTGRES_DB,
        DB_USERNAME: env.POSTGRES_USER,
        DB_PASSWORD: env.POSTGRES_PASSWORD,
        REPLICATE_API_TOKEN: env.REPLICATE_API_TOKEN,
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
        REPLICATE_API_TOKEN: "",
      };
      populateEnv(env, { mode: "halt" });
      return env;
    }
    default:
      throw new Error("Unknown NODE_ENV: " + env.NODE_ENV);
  }
}

export const env = loadEnv();

export const REPLICATE_API_TOKEN = env.REPLICATE_API_TOKEN;

console.log("check check", env);
