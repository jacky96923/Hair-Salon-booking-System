import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("table_name").del();

  // Inserts seed entries
  let days = 30;
  let timeslots = 11;
  for (let i = 0; i < days; i++) {
    for (let j = 0; j < timeslots; j++)
      await knex("table_name").insert([
        { id: 1, colName: "rowValue1" },
        { id: 2, colName: "rowValue2" },
        { id: 3, colName: "rowValue3" },
      ]);
  }
}
