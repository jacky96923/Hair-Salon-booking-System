import { Knex } from "knex";

export class SaveImageService {
  constructor(private knex: Knex) {}

  async saveOutput(result: string, requestedStyle: string) {
    try {
      let user_id = 1;
      return await this.knex
        .insert({
          user_id: user_id,
          filename: result,
          style: requestedStyle,
        })
        .into("image");
    } catch (error) {
      console.log("Cannot save to knex:", error);
    }
  }
}
