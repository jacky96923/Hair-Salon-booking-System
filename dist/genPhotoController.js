"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenPhotoController = void 0;
const replicate_1 = __importDefault(require("replicate"));
const env_1 = require("./env");
const datauri_1 = __importDefault(require("datauri"));
class GenPhotoController {
    sendRequest = async (req, res) => {
        try {
            const { type, color, style, path } = req.body.formObject;
            console.log(req.body);
            console.log(type);
            console.log(path);
            const imagePath = path;
            const image = await (0, datauri_1.default)(imagePath);
            const replicate = new replicate_1.default({
                auth: env_1.REPLICATE_API_TOKEN,
            });
            const output = await replicate.run("wty-ustc/hairclip:b95cb2a16763bea87ed7ed851d5a3ab2f4655e94bcfb871edba029d4814fa587", {
                input: {
                    image: image,
                    editing_type: type,
                    hairstyle_description: style,
                    color_description: color,
                },
            });
            const results = output.toString() + "," + style;
            console.log("controller:", output);
            console.log("imageUrl:", results);
            res.status(200).json(results);
        }
        catch (error) {
            console.error("Error processing request:", error);
        }
    };
}
exports.GenPhotoController = GenPhotoController;
