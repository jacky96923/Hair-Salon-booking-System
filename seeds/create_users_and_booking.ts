import { Knex } from "knex";
import moment from "moment";
import { hashPassword } from "../hash";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries (booking)
  await knex("booking").del();
  // Deletes ALL existing entries (users)
  await knex("users").del();

  // ask here
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE booking_id_seq RESTART WITH 1");

  // Inserts seed entries (users)
  await knex("users").insert([
    {
      // id: 1,
      name: "jacky",
      email: "jackylai96923@gmail.com",
      password: await hashPassword("123"),
    },
    {
      // id: 2,
      name: "brian",
      email: "brianchan@gmail.com",
      password: await hashPassword("123"),
    },
    {
      // id: 3,
      name: "kenneth",
      email: "kennethpang@gmail.com",
      password: await hashPassword("123"),
    },
  ]);
  // Inserts seed entries (bookings)
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

  // console.log(
  //   moment(`${bookings[0].date} ${bookings[0].time}`, "YYYY-MM-DD hh:mm")
  // );

  await knex("booking").insert([
    {
      user_id: 1,
      datetime: moment(
        `${bookings[0].date} ${bookings[0].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Haircut Wash Style",
      remarks: "I need to go before 14:00",
    },
    {
      user_id: 2,
      datetime: moment(
        `${bookings[1].date} ${bookings[1].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Haircut Wash Style",
      remarks: "None",
    },
    {
      user_id: 3,
      datetime: moment(
        `${bookings[2].date} ${bookings[2].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Haircut Wash Style",
      remarks: "None",
    },
    {
      user_id: 1,
      datetime: moment(
        `${bookings[3].date} ${bookings[3].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Style Perming",
      remarks: "None",
    },
    {
      user_id: 1,
      datetime: moment(
        `${bookings[4].date} ${bookings[4].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Style Perming",
      remarks: "None",
    },
    {
      user_id: 2,
      datetime: moment(
        `${bookings[5].date} ${bookings[5].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Style Perming",
      remarks: "None",
    },
  ]);
}
