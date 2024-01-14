import { Console } from "console";
import { Request, Response } from "express";
import Replicate from "replicate";

export class GenPhotoController {
  sendRequest = async (req: Request, res: Response) => {
    try {
      const { type, color, style } = req.body;
      console.log("controller:", req.body);
      const [hairStyle, special] = style.split("/");
      const response = {
        success: true,
        message: "Request processed successfully",
        data: {
          type,
          color,
          hairStyle,
        },
      };
      console.log("testing:", response);

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

      const output = await replicate.run(
        "wty-ustc/hairclip:b95cb2a16763bea87ed7ed851d5a3ab2f4655e94bcfb871edba029d4814fa587",
        {
          input: {
            image: "https://example.com/image.png",
          },
        }
      );
      console.log(output);
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };
}
