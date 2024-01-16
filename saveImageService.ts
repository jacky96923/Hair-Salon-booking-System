import { Knex } from "knex";

export class SaveImageService {
  constructor(private knex: Knex) {}

  async saveOutput(result: string, requestedStyle: string, userId: any) {
    try {
      return await this.knex
        .insert({
          user_id: userId,
          filename: result,
          style: requestedStyle,
        })
        .into("image");
    } catch (error) {
      console.log("Cannot save to knex:", error);
    }
  }
}
