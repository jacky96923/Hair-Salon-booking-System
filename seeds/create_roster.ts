import { Knex } from "knex";
import moment from "moment";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("roster").del();

  // Inserts seed entries
  let startDateTime = { date: "2024-01-13", time: "10:00" }
  let momentStartDateTime = moment(`${startDateTime.date} ${startDateTime.time}`, "YYYY-MM-DD hh:mm")
  let days = 30;
  let timeslots = 11;

  for (let i = 0; i < days; i++) {
    momentStartDateTime.add(i, 'days')
    for (let j = 0; j < timeslots; j++) {
      momentStartDateTime.add(j, 'hours')
      await knex("roster").insert([
        { datetime: momentStartDateTime.format("YYYY-MM-DD HH:mm"), 
          man_count: 1, 
          p_count: 0, 
          c_count: 0
        }
      ]);
      momentStartDateTime.subtract(j, 'hours')
    }
    momentStartDateTime.subtract(i, 'days')
  }
}

