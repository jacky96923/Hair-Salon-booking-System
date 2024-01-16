"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prediction = exports.ImageController = void 0;
const fs_1 = require("fs");
const formidable_1 = require("formidable");
const crypto_1 = require("crypto");
const form_1 = require("./form");
const path_1 = __importDefault(require("path"));
let uploadDir = "uploads";
(0, fs_1.mkdirSync)(uploadDir, { recursive: true });
let prediction;
class ImageController {
    uploadImage = async (req, res, next) => {
        let form = new formidable_1.Formidable({
            uploadDir,
            maxFiles: 1,
            maxFileSize: 5 * 1024 * 1024 * 10,
            filter(part) {
                return part.mimetype?.startsWith("image/") || false;
            },
            filename(_name, _ext, part, form) {
                let uuid = (0, crypto_1.randomUUID)();
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
                let imageFiles = (0, form_1.toArray)(files.upload_image);
                let image = imageFiles.map((file) => file.newFilename);
                if (!imageFiles) {
                    res.status(400);
                    res.json({ error: "Missing image content" });
                    // next(new Error('Missing "content" in request.body'))
                    return;
                }
                let rePath = path_1.default.join("../dist/uploads", image[0]);
                let py_filename = await fetch("http://localhost:8000/pyShape", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image: rePath }),
                });
                exports.prediction = prediction = await py_filename.json();
                console.log("first:", prediction);
                res.json({ prediction, rePath });
                // return rePath;
            }
            catch (error) {
                res.status(500);
                res.json({ error: "Sad Upload" });
            }
        });
    };
}
exports.ImageController = ImageController;
