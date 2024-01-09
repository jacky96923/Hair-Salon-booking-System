import Knex from "knex";
import { env } from "./env";

export function createKnex() {
  let config = require("./knexfile");
  let profile = config[env.NODE_ENV];

  let knex = Knex(profile);
  return knex;
}
