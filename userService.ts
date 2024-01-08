import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async login(email: string, password: string) {
    return await this.knex.select("*").from("users").where("email", email);
  }
}
