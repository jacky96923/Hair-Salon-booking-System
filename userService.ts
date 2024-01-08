import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async login(username: string, password: string) {
    return await this.knex.select("*").from("users").where("email", username);
  }
}
