import { Knex } from "knex";
import moment from "moment";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  //   await knex("table_name").del();

  // Inserts seed entries
  let bookings = [{ date: "2024-01-13", time: "10:00" }];

  console.log(
    moment(`${bookings[0].date} ${bookings[0].time}`, "YYYY-MM-DD hh:mm")
  );

  await knex("table_name").insert([
    {
      datetime: moment(
        `${bookings[0].date} ${bookings[0].time}`,
        "YYYY-MM-DD hh:mm".valueOf()
      ),
      purpose: "Haircut Wash Style",
      remarks: "I need to go before 14:00",
    },
  ]);
}
