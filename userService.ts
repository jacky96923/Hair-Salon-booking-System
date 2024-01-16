import { Knex } from "knex";
import { hashPassword } from "./hash";
import { promises } from "dns";
import moment from "moment";

export class UserService {
  constructor(private knex: Knex) {}

  async login(email: string, password: string) {
    //console.log("check login service:", await this.knex.select("*").from("users").where("email", email))
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
  //Promise<{ man_count: number; c_count: number; } | undefined>
  async booking_timeslot(category: string, dateTime: string) {
    try {
        return await this.knex.select("man_count", "c_count", "p_count").from("roster").where("datetime", dateTime)
    } catch (error) {
      
    }
    
  }
  async booking_request(category: string, datetime: string, remarks: string) {
    try {
      if (category === "Haircut Wash Style") {
        await this.knex("booking").insert({
          purpose: category,
          datetime: datetime,
          remarks: remarks,
        });
        await this.knex.raw(
          "update roster set c_count = c_count + 1 where datetime = ?",
          [datetime]
        );
      } else if (category === "Style Perming") {
        await this.knex("booking").insert({
          purpose: category,
          datetime: datetime,
          remarks: remarks,
        });

        let momentStartDateTime = moment(datetime, "YYYY-MM-DD hh:mm");
        let days = 30;
        let timeslots = 3;
        for (let i = 0; i < days; i++) {
          momentStartDateTime.add(i, "days");
          for (let j = 0; j < timeslots; j++) {
            momentStartDateTime.add(j, "hours");
            await this.knex.raw(
              "update roster set p_count = p_count + 1 where datetime = ?",
              [datetime]
            );
            momentStartDateTime.subtract(j, "hours");
          }
          momentStartDateTime.subtract(i, "days");
        }
      }
      return;
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
