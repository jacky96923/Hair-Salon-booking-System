"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const path_1 = __importDefault(require("path"));
let styles = [
    { style: "afro hairstyle", special: true },
    { style: "bob cut hairstyle", special: false },
    { style: "bowl cut hairstyle", special: false },
    { style: "braid hairstyle", special: false },
    { style: "caesar cut hairstyle", special: false },
    { style: "chignon hairstyle", special: false },
    { style: "cornrows hairstyle", special: false },
    { style: "crew cut hairstyle", special: false },
    { style: "crown braid hairstyle", special: false },
    { style: "curtained hair hairstyle", special: false },
    { style: "dido flip hairstyle", special: false },
    { style: "dreadlocks hairstyle", special: true },
    { style: "extensions hairstyle", special: true },
    { style: "fade hairstyle", special: false },
    { style: "fauxhawk hairstyle", special: false },
    { style: "finger waves hairstyle", special: false },
    { style: "french braid hairstyle", special: false },
    { style: "frosted tips hairstyle", special: true },
    { style: "full crown hairstyle", special: false },
    { style: "harvard clip hairstyle", special: false },
    { style: "hi-top fade hairstyle", special: false },
    { style: "high and tight hairstyle", special: false },
    { style: "hime cut hairstyle", special: false },
    { style: "jewfro hairstyle", special: true },
    { style: "jheri curl hairstyle", special: true },
    { style: "liberty spikes hairstyle", special: true },
    { style: "marcel waves hairstyle", special: true },
    { style: "mohawk hairstyle", special: false },
    { style: "pageboy hairstyle", special: false },
    { style: "perm hairstyle", special: true },
    { style: "ringlets hairstyle", special: true },
    { style: "pixie cut hairstyle", special: false },
    { style: "psychobilly wedge hairstyle", special: false },
    { style: "quiff hairstyle", special: false },
    { style: "regular taper cut hairstyle", special: false },
    { style: "shingle bob hairstyle", special: false },
    { style: "short hair hairstyle", special: false },
    { style: "slicked-back hairstyle", special: false },
    { style: "spiky hair hairstyle", special: false },
    { style: "surfer hair hairstyle", special: false },
    { style: "taper cut hairstyle", special: false },
    { style: "the rachel hairstyle", special: false },
    { style: "undercut hairstyle", special: false },
    { style: "updo hairstyle", special: false },
];
async function seed(knex) {
    console.log("--------------------", 4, "--------------------");
    // Deletes ALL existing entries
    await knex("style_match").del();
    await knex("style_images").del();
    await knex("style_list").del();
    await knex("faceshape").del();
    // Inserts seed entries
    await knex
        .insert([
        { shape: "Oval" },
        { shape: "Heart" },
        { shape: "Round" },
        { shape: "Square" },
        { shape: "oblong" },
    ])
        .into("faceshape");
    for (let style of styles) {
        const styleListId = await knex
            .insert(style)
            .into("style_list")
            .returning("id");
        const imageFileName = `${style.style}.jpg`;
        const imagePath = path_1.default.join("hair_style", imageFileName);
        await knex
            .insert({
            image: imagePath,
            style_list_id: styleListId[0].id,
        })
            .into("style_images");
    }
}
exports.seed = seed;
