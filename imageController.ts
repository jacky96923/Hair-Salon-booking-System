import { NextFunction, Request, Response } from "express";
import { fstat, mkdirSync } from "fs";
import formidable from "formidable";
import { randomUUID } from "crypto";
import { toStringField, toArray } from "./form";
import path from "path";

let uploadDir = "uploads";
mkdirSync(uploadDir, { recursive: true });

export class ImageController {
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    let form = formidable({
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
        let content = toStringField(fields.content);
        let imageFiles = toArray(files.images);
        let image = imageFiles.map((file) => file.newFilename);
        let rePath = path.join("/upload", image[0]);
        let py_filename = await fetch("/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: rePath }),
        });
        let prediction = await py_filename.json();
        console.log(prediction);

        // fetch to python
        // get result from predition
        res.json({ success: true });
      } catch (error) {
        res.status(500);
        res.json({ error: "Sad Upload" });
      }
    });
  };
}
