import { Knex } from "knex";
import { prediction } from "../controller/imageController";

export class SuggestedService {
  constructor(private knex: Knex) {}

  async getPrediction() {
    try {
      console.log("service:", prediction);
      let style = await this.knex
        .select("style_list.id", "style_list.style", "style_list.special")
        .from("style_list")
        .join("style_match", "style_list.id", "=", "style_match.style_list_id")
        .join("faceshape", "style_match.faceshape_id", "=", "faceshape.id")
        .where("faceshape.shape", "=", prediction.predicted_class);
      if (!style) {
        throw new Error("No matching style found");
      }
      return style;
    } catch (error) {
      console.error("error:", error);
    }
  }
}
