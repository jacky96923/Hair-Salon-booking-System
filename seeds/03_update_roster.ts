import { Knex } from "knex";
import moment from "moment";

export async function seed(knex: Knex): Promise<void> {
  console.log("--------------------", 3, "--------------------");
  // Deletes ALL existing entries (back to initial state)
  await knex("roster").update({ c_count: 0, p_count: 0 });
  // Inserts seed entries
  let bookings = [
    { date: "2024-01-29", time: "10:00" }, //user_id: 1 C
    { date: "2024-01-29", time: "10:00" }, //user_id: 2 P
    { date: "2024-01-29", time: "11:00" }, //user_id: 3 P
    { date: "2024-01-29", time: "12:00" }, //user_id: 1 C
    { date: "2024-01-29", time: "13:00" }, //user_id: 1 P
    { date: "2024-01-29", time: "13:00" }, //user_id: 2 C
  ];
  // Time/Id    1        2         3       available
  // 10 - 11    C*   |  P(3)*  |         ->    1P
  // 11 - 12         |  P(2)   |  P(3)*  ->    1C or 2P
  // 12 - 13    C*   |  P(1)   |  P(2)   ->    X
  // 13 - 14   P(3)* |   C*    |  P(1)   ->    X
  // 14 - 15   P(2)  |         |         ->  1C, 1P or 3P

  let booking_datetime = bookings.map((booking) => {
    return moment(`${booking.date} ${booking.time}`, "YYYY-MM-DD hh:mm").format(
      "YYYY-MM-DD HH:mm"
    );
  });
  console.log(booking_datetime);
  await knex.raw(`UPDATE roster SET c_count = c_count + 1 WHERE datetime = ?`, [
    booking_datetime[0],
  ]);
  await knex.raw(`UPDATE roster SET c_count = c_count + 1 WHERE datetime = ?`, [
    booking_datetime[1],
  ]);
  await knex.raw(`UPDATE roster SET c_count = c_count + 1 WHERE datetime = ?`, [
    booking_datetime[2],
  ]);
  await knex.raw(`UPDATE roster SET p_count = p_count + 1 WHERE datetime = ?`, [
    booking_datetime[3],
  ]);
  await knex.raw(`UPDATE roster SET p_count = p_count + 1 WHERE datetime = ?`, [
    booking_datetime[4],
  ]);
  await knex.raw(`UPDATE roster SET p_count = p_count + 1 WHERE datetime = ?`, [
    booking_datetime[5],
  ]);
}
