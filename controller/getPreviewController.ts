import { Request, Response, NextFunction } from "express";
import { GetPreviewService } from "../service/getPreviewService";

export class GetPreviewController {
  constructor(private getPreviewService: GetPreviewService) {}
  getPreview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id = +req.params.id;
      const previewLink = await this.getPreviewService.getPreview(id);
      return res.json(previewLink);
    } catch (error) {
      console.error("GetPreivewController:", error);
    }
  };
}
