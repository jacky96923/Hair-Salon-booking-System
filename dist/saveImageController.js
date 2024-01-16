"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveImageController = void 0;
const fs_1 = require("fs");
const formidable_1 = require("formidable");
const crypto_1 = require("crypto");
const form_1 = require("./form");
const path_1 = __importDefault(require("path"));
let uploadDir = "result_images";
(0, fs_1.mkdirSync)(uploadDir, { recursive: true });
class SaveImageController {
    saveImageService;
    constructor(saveImageService) {
        this.saveImageService = saveImageService;
    }
    saveImage = async (req, res, next) => {
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
        console.log("saveImage:", form);
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            try {
                const requestedStyle = (0, form_1.toStringField)(fields.style);
                console.log("content:", requestedStyle);
                let imageFiles = (0, form_1.toArray)(files.upload_image);
                let image = imageFiles.map((file) => file.newFilename);
                const userId = req.session.user ? req.session.user.id : undefined;
                console.log(userId);
                if (!requestedStyle) {
                    res.status(400);
                    res.json({ error: "Missing image content" });
                    // next(new Error('Missing "content" in request.body'))
                    return;
                }
                let result = path_1.default.join("/result_image", image[0]);
                console.log("path:", result);
                let savedPath = await this.saveImageService.saveOutput(result, requestedStyle, userId);
            }
            catch (error) {
                res.status(500);
                res.json({ error: "Sad Upload" });
            }
        });
    };
}
exports.SaveImageController = SaveImageController;
