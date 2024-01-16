import { Request, Response } from "express";
import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from "./env";
import datauri from "datauri";

export class GenPhotoController {
  sendRequest = async (req: Request, res: Response) => {
    try {
      const { type, color, style, path } = req.body.formObject;
      console.log(req.body);
      console.log(type);
      console.log(path);

      const imagePath = path;
      const image = await datauri(imagePath);
      const replicate = new Replicate({
        auth: REPLICATE_API_TOKEN,
      });

      const output = await replicate.run(
        "wty-ustc/hairclip:b95cb2a16763bea87ed7ed851d5a3ab2f4655e94bcfb871edba029d4814fa587",
        {
          input: {
            image: image,
            editing_type: type,
            hairstyle_description: style,
            color_description: color,
          },
        }
      );
      const results = output.toString() + "," + style;
      console.log("controller:", output);
      console.log("imageUrl:", results);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };
}
