import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      name: "jacky",
      email: "jackylai96923@gmail.com",
      password: await hashPassword("123"),
    },
    {
      name: "brian",
      email: "brianchan@gmail.com",
      password: await hashPassword("123"),
    },
    {
      name: "kenneth",
      email: "kennethpang@gmail.com",
      password: await hashPassword("123"),
    },
  ]);
}
