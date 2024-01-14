import { Request, Response } from "express";
import { SuggestedService } from "./suggestedService";

export class SuggestedController {
  constructor(private suggestedService: SuggestedService) {}
  getSuggested = async (req: Request, res: Response) => {
    try {
      const result = await this.suggestedService.getPrediction();
      res.json({ result });
    } catch (error) {
      console.log("Error:", error);
    }
  };
}
