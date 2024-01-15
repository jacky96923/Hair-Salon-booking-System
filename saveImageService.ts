import { Knex } from "knex";

export class SaveImageService {
  constructor(private knex: Knex) {}

  async saveOutput() {
    try {
      return await this.knex.insert({});
    } catch (error) {
      console.log("Cannot save to knex:", error);
    }
  }
}
