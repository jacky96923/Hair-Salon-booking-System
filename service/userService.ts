import { Knex } from "knex";
import { hashPassword } from "../hash";
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

  getUsername = async (
    user_id: number
  ): Promise<{ name: string }[] | unknown> => {
    try {
      return await this.knex("users").select("name").where("id", user_id);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  };
  //Promise<{ man_count: number; c_count: number; } | undefined>
  async booking_timeslot(dateTime: string) {
    try {
      return await this.knex
        .select("man_count", "c_count", "p_count")
        .from("roster")
        .where("datetime", dateTime);
    } catch (error) {}
  }
  async booking_request(
    user_id: number,
    category: string,
    datetime: string,
    remarks: string,
    image_id?: number
  ) {
    try {
      if (category === "Haircut Wash Style") {
        if (image_id) {
          await this.knex("booking").insert({
            user_id: user_id,
            purpose: category,
            datetime: datetime,
            remarks: remarks,
            image_id: image_id,
          });
        } else {
          await this.knex("booking").insert({
            user_id: user_id,
            purpose: category,
            datetime: datetime,
            remarks: remarks,
          });
        }
        await this.knex.raw(
          "update roster set c_count = c_count + 1 where datetime = ?",
          [datetime]
        );
      } else if (category === "Style Perming") {
        if (image_id) {
          await this.knex("booking").insert({
            user_id: user_id,
            purpose: category,
            datetime: datetime,
            remarks: remarks,
            image_id: image_id,
          });
        } else {
          await this.knex("booking").insert({
            user_id: user_id,
            purpose: category,
            datetime: datetime,
            remarks: remarks,
          });
        }
        let momentStartDateTime = moment(datetime, "YYYY-MM-DD hh:mm");
        let timeslots = 3;
        for (let j = 0; j < timeslots; j++) {
          momentStartDateTime.add(j, "hours");
          await this.knex.raw(
            "update roster set p_count = p_count + 1 where datetime = ?",
            [momentStartDateTime]
          );
          momentStartDateTime.subtract(j, "hours");
        }
      }
      return;
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async getStyleImg(photo_id: number) {
    try {
      return await this.knex
        .select("filename")
        .from("image")
        .where("id", photo_id);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async getGenPhoto(user_id: number) {
    try {
      return await this.knex
        .select("id", "filename", "style")
        .from("image")
        .where("user_id", user_id);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }
  async removeGenPhoto(photo_id: number) {
    try {
      await this.knex("booking")
        .where("image_id", photo_id)
        .update("image_id", null);
      const result = await this.knex("image").where("id", photo_id).del();
      return result;
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
