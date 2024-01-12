import { Knex } from "knex";
import moment from "moment";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries (back to initial state)
  await knex("roster").update({ c_count: 0, p_count: 0 });
  // Inserts seed entries
  let bookings = [
    { date: "2024-01-13", time: "10:00" }, //user_id: 1
    { date: "2024-01-13", time: "12:00" }, //user_id: 2
    { date: "2024-02-09", time: "12:00" }, //user_id: 3
    { date: "2024-02-09", time: "13:00" }, //user_id: 1
    { date: "2024-02-09", time: "13:00" }, //user_id: 2
    { date: "2024-02-09", time: "15:00" }, //user_id: 3
  ];
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
