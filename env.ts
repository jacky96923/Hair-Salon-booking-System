import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
<<<<<<< HEAD
  DB_NAME: '',
  DB_USER: '',
  DB_PASSWORD: '',
  SESSION_SECRET: ''
}
=======
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  SESSION_SECRET: "",
};
>>>>>>> e9caa832845a1df20a13b65dcb3acb62dfbcfa5f

populateEnv(env, { mode: "halt" });
