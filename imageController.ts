import { NextFunction, Request, Response } from "express";
import { fstat, mkdirSync } from "fs";
import { Formidable } from "formidable";
import { randomUUID } from "crypto";
import { toStringField, toArray } from "./form";
import path from "path";

let uploadDir = "uploads";
mkdirSync(uploadDir, { recursive: true });

let prediction: any;

export class ImageController {
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    let form = new Formidable({
      uploadDir,
      multiples: true,
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
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      try {
        let imageFiles = toArray(files.upload_image);
        let image = imageFiles.map((file) => file.newFilename);
        if (!imageFiles) {
          res.status(400);
          res.json({ error: "Missing image content" });
          // next(new Error('Missing "content" in request.body'))
          return;
        }
        let rePath = path.join("/uploads", image[0]);
        let py_filename = await fetch("http://localhost:8000/pyShape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: rePath }),
        });
        prediction = await py_filename.json();
        console.log("first:", prediction);
        res.json(prediction);
      } catch (error) {
        res.status(500);
        res.json({ error: "Sad Upload" });
      }
    });
  };
}

export { prediction };
