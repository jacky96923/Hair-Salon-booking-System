"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestedController = void 0;
class SuggestedController {
    suggestedService;
    constructor(suggestedService) {
        this.suggestedService = suggestedService;
    }
    getSuggested = async (req, res) => {
        try {
            const result = await this.suggestedService.getPrediction();
            res.json({ result });
        }
        catch (error) {
            console.log("Error:", error);
        }
    };
}
exports.SuggestedController = SuggestedController;
