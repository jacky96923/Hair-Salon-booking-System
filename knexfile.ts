import type { Knex } from "knex";
import { env } from "./env";

let pgConfig: Knex.Config = {
  client: "pg",
  connection: {
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    multipleStatements: true,
  },
};

const config: { [key: string]: Knex.Config } = {
  development: pgConfig,
  test: pgConfig,
  ci: pgConfig,
  production: pgConfig,
};

module.exports = config;
