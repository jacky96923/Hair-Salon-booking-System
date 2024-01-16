import { NextFunction, Request, Response } from "express";
import { fstat, mkdirSync } from "fs";
import { Formidable } from "formidable";
import { randomUUID } from "crypto";
import { toStringField, toArray } from "./form";
import path from "path";
import { SaveImageService } from "./saveImageService";

let uploadDir = "result_images";
mkdirSync(uploadDir, { recursive: true });

export class SaveImageController {
  constructor(private saveImageService: SaveImageService) {}
  saveImage = async (req: Request, res: Response, next: NextFunction) => {
    let form = new Formidable({
      uploadDir,
      maxFiles: 1,
      maxFileSize: 5 * 1024 * 1024 * 10,
      filter(part) {
        return part.mimetype?.startsWith("image/") || false;
      },
      filename(_name, _ext, part, form) {
        let uuid = randomUUID();
        let extName = part.mimetype?.split("/").pop();
        return `${uuid}.${extName}`;
      },
    });
    console.log("saveImage:", form);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      try {
        const requestedStyle = toStringField(fields.style);
        console.log("content:", requestedStyle);
        let imageFiles = toArray(files.upload_image);
        let image = imageFiles.map((file) => file.newFilename);
        const userId = req.session.user ? req.session.user.id : undefined;
        console.log(userId);
        if (!requestedStyle) {
          res.status(400);
          res.json({ error: "Missing image content" });
          // next(new Error('Missing "content" in request.body'))
          return;
        }
        let result = path.join("/result_image", image[0]);
        console.log("path:", result);
        let savedPath = await this.saveImageService.saveOutput(
          result,
          requestedStyle,
          userId
        );
      } catch (error) {
        res.status(500);
        res.json({ error: "Sad Upload" });
      }
    });
  };
}
