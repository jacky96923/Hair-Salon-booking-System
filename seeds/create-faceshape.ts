import { truncate } from "fs/promises";
import { Knex } from "knex";
import fs from "fs";
import path from "path";
import xlsx from "xlsx-populate";

let styles = [
  { style: "Afro Hairstyle", special: true },
  { style: "Bob Cut Hairstyle", special: false },
  { style: "Bowl Cut Hairstyle", special: false },
  { style: "Braid Hairstyle", special: false },
  { style: "Caesar Cut Hairstyle", special: false },
  { style: "Chignon Hairstyle", special: false },
  { style: "Cornrows Hairstyle", special: false },
  { style: "Crew Cut Hairstyle", special: false },
  { style: "Crown Braid Hairstyle", special: false },
  { style: "Curtained Hair Hairstyle", special: false },
  { style: "Dido Flip Hairstyle", special: false },
  { style: "Dreadlocks Hairstyle", special: true },
  { style: "Extensions Hairstyle", special: true },
  { style: "Fade Hairstyle", special: false },
  { style: "Fauxhawk Hairstyle", special: false },
  { style: "Finger Waves Hairstyle", special: false },
  { style: "French Braid Hairstyle", special: false },
  { style: "Frosted Tips Hairstyle", special: true },
  { style: "Full Crown Hairstyle", special: false },
  { style: "Harvard Clip Hairstyle", special: false },
  { style: "Hi-Top Fade Hairstyle", special: false },
  { style: "High and Tight Hairstyle", special: false },
  { style: "Hime Cut Hairstyle", special: false },
  { style: "Jewfro Hairstyle", special: true },
  { style: "Jheri Curl Hairstyle", special: true },
  { style: "Liberty Spikes Hairstyle", special: true },
  { style: "Marcel Waves Hairstyle", special: true },
  { style: "Mohawk Hairstyle", special: false },
  { style: "Pageboy Hairstyle", special: false },
  { style: "Perm Hairstyle", special: true },
  { style: "Pinglets Hairstyle", special: true },
  { style: "Pixie Cut Hairstyle", special: false },
  { style: "Psychobilly Wedge Hairstyle", special: false },
  { style: "Quiff Hairstyle", special: false },
  { style: "Regular Taper Cut Hairstyle", special: false },
  { style: "Shingle Bob Hairstyle", special: false },
  { style: "Short Hair Hairstyle", special: false },
  { style: "Slicked-Back Hairstyle", special: false },
  { style: "Spiky Hair Hairstyle", special: false },
  { style: "Surfer Hair Hairstyle", special: false },
  { style: "Taper Cut Hairstyle", special: false },
  { style: "The Rachel Hairstyle", special: false },
  { style: "Undercut Hairstyle", special: false },
  { style: "Updo Hairstyle", special: false },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("faceshape").del();
  await knex("styleMatch").del();
  await knex("styleList").del();
  await knex("styleImages").del();

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
      .into("styleList")
      .returning("id");

    const imageFileName = `${style.style}.jpg`;
    const imagePath = path.join("hair_style", imageFileName);

    await knex
      .insert({
        image: imagePath,
        styleList_id: styleListId[0],
      })
      .into("styleImage");
  }

  const workbook = await xlsx.fromFileAsync("./styleMatch.xlsx");
  const worksheet = workbook.sheet("Sheet1");

  const faceshapes = worksheet.range("A1:E1").value().filter(Boolean);

  for (let i = 0; i < faceshapes.length; i++) {
    const faceshape = faceshapes[i];
    const hairStyles = worksheet
      .column(i + 1)
      .slice(1)
      .map((cell) => cell.value())
      .filter(Boolean);
  }

  await knex.insert([]).into("styleMatch");
}
