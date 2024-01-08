import { Knex } from "knex";
import { hashPassword } from "./hash";

export class UserService {
  constructor(private knex: Knex) { }

  async login(email: string, password: string) {
    return await this.knex.select("*").from("users").where("email", email);
  }

  async register(name: string, email: string, password: string) {
    try {
      return await this.knex.insert({ name: name, email: email, password: await hashPassword(password) }).into("users").returning("*")      
    } catch (error) {
      console.error("error:", error)
      return error
    }
  }

  async hasUser(email: string) {
    try {
      const existingEmail = await this.knex.select("email").from("users");
      return existingEmail.some((user) => user.email === email)
    } catch (error) {
      console.error("error:", error)
      return error
    }
  }
}