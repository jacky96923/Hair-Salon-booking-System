import { Request, Response } from "express";
import { mkdirSync } from "fs";

let uploadDir = "uploads";
mkdirSync(uploadDir, { recursive: true });

export class ImageController {
  constructor() {}

  uploadImage = async (req: Request, res: Response) => {
    try {
      const image = req.body.file;
      console.log(image);
    } catch (error) {
      res.status(500);
      res.json({ error: "Sad Upload" });
    }
  };
}
