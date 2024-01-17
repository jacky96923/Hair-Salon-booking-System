import { Knex } from "knex";

export class GetPreviewService {
  constructor(private knex: Knex) {}

  async getPreview(id: number) {
    try {
      console.log("service:", id);
      let preview = await this.knex
        .select("image")
        .from("style_images")
        .where("style_list_id", "=", id);
      if (!preview) {
        throw new Error("No matching image found");
      }
      return preview;
    } catch (error) {
      console.error("error:", error);
    }
  }
}
