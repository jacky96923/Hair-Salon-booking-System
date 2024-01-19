import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import path from "path";

// terminal counter
let mediaExtnameList = [
  ".js",
  ".css",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".ico",
  ".mp3",
  ".mp4",
];
function isMediaExtname(extname: string): boolean {
  return mediaExtnameList.includes(extname);
}
export let terminalCounter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let counter = req.session.counter || 0; //counter, the number before the logs
  if (!isMediaExtname(path.extname(req.url))) {
    //for prevent counting .js/.css/.jpg etc.
    counter++;
    req.session.counter = counter;
  }
  let timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] #${counter} ${req.method} Request ${req.url}`);
  next();
};
