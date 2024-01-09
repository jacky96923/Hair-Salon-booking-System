import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  POSTGRES_DB: "",
  POSTGRES_USER: "",
  POSTGRES_PASSWORD: "",
};

populateEnv(env, { mode: "halt" });
