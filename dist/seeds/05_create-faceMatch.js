"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaceshapeId = exports.getStyleListId = exports.seed = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
async function seed(knex) {
    console.log("--------------------", 5, "--------------------");
    // Deletes ALL existing entries from styleMatch
    await knex("style_match").del();
    const workbook = xlsx_1.default.readFile("./styleMatch.xlsx");
    const worksheet = workbook.Sheets["Sheet1"];
    const shapes = xlsx_1.default.utils.sheet_to_json(worksheet);
    console.log(shapes);
    for (let entry of shapes) {
        console.log(entry);
        for (let key in entry) {
            console.log("========");
            console.log(key, ":", entry[key]);
            let face_id = await getFaceshapeId(knex, key);
            let style_list_id = await getStyleListId(knex, entry[key]);
            console.log("++++++");
            console.log(face_id, ":", style_list_id);
            await knex("style_match").insert({
                style_list_id: style_list_id,
                faceshape_id: face_id,
            });
        }
    }
}
exports.seed = seed;
async function getStyleListId(knex, style) {
    const result = await knex("style_list")
        .select("id")
        .where("style", style)
        .first();
    // console.log(`Style: ${style}, Result: ${result}`);
    return result ? result.id : null;
}
exports.getStyleListId = getStyleListId;
async function getFaceshapeId(knex, shape) {
    const result = await knex("faceshape")
        .select("id")
        .where("shape", shape)
        .first();
    // console.log(`Faceshape: ${shape}, Result: ${result}`);
    return result ? result.id : null;
}
exports.getFaceshapeId = getFaceshapeId;
