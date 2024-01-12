import { Knex } from "knex";
import xlsx from "xlsx";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries from styleMatch
  await knex("styleMatch").del();

  const workbook = xlsx.readFile("./styleMatch.xlsx");
  const worksheet = workbook.Sheets["Sheet1"];

  let shapes = xlsx.utils.sheet_to_json(worksheet);
  console.log(shapes);
}
