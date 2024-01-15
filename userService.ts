import { Knex } from "knex";
import { hashPassword } from "./hash";
import { promises } from "dns";

export class UserService {
  constructor(private knex: Knex) {}

  async login(email: string, password: string) {
    return await this.knex.select("*").from("users").where("email", email);
  }

  async register(name: string, email: string, password: string): Promise<any> {
    try {
      return await this.knex
        .insert({
          name: name,
          email: email,
          password: await hashPassword(password),
        })
        .into("users")
        .returning("*");
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async booking_request(category: string, datetime: string, remarks: string) {
    try {
      return await this.knex.insert({
        purpose: category,
        datetime: datetime,
        remarks: remarks,
      });
    } catch (error) {
      console.error("error:", error);

      return error;
    }
  }

  async hasUser(email: string) {
    try {
      const existingEmail = await this.knex.select("email").from("users");
      return existingEmail.some((user) => user.email === email);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }
}
