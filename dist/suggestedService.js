"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestedService = void 0;
const imageController_1 = require("./imageController");
class SuggestedService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async getPrediction() {
        try {
            console.log("service:", imageController_1.prediction);
            let style = await this.knex
                .select("style_list.style", "style_list.special")
                .from("style_list")
                .join("style_match", "style_list.id", "=", "style_match.style_list_id")
                .join("faceshape", "style_match.faceshape_id", "=", "faceshape.id")
                .where("faceshape.shape", "=", imageController_1.prediction.predicted_class);
            if (!style) {
                throw new Error("No matching style found");
            }
            return style;
        }
        catch (error) {
            console.error("error:", error);
        }
    }
}
exports.SuggestedService = SuggestedService;
