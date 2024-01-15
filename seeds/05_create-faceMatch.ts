import { Knex } from "knex";
import xlsx from "xlsx";

export async function seed(knex: Knex): Promise<void> {
  console.log("--------------------", 5, "--------------------");
  // Deletes ALL existing entries from styleMatch
  await knex("style_match").del();

  const workbook = xlsx.readFile("./styleMatch.xlsx");
  const worksheet = workbook.Sheets["Sheet1"];
  const shapes: any[] = xlsx.utils.sheet_to_json(worksheet);
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

export async function getStyleListId(
  knex: Knex,
  style: string
): Promise<number | null> {
  const result = await knex("style_list")
    .select("id")
    .where("style", style)
    .first();

  // console.log(`Style: ${style}, Result: ${result}`);

  return result ? result.id : null;
}

export async function getFaceshapeId(
  knex: Knex,
  shape: string
): Promise<number | null> {
  const result = await knex("faceshape")
    .select("id")
    .where("shape", shape)
    .first();

  // console.log(`Faceshape: ${shape}, Result: ${result}`);

  return result ? result.id : null;
}
