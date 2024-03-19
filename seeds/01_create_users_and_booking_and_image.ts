import { Knex } from "knex";
import moment from "moment";
import { hashPassword } from "../hash";
export async function seed(knex: Knex): Promise<void> {
  console.log("--------------------", 1, "--------------------");
  // Deletes ALL existing entries (booking)
  await knex("booking").del();
  // Deletes ALL existing entries (image)
  await knex("image").del();
  // Deletes ALL existing entries (users)
  await knex("users").del();

  // ask here
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE image_id_seq RESTART WITH 1");
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

  // Inserts seed entries (images)
  await knex("image").insert([
    {
      user_id: 3,
      filename: "7c3e97e2-0a74-4bce-beae-2339f36c53b4.png",
      style: "undercut hairstyle",
    },
    {
      user_id: 3,
      filename: "21d0e378-9b67-4405-be62-97939fe5491c.png",
      style: "short hair hairstyle",
    },
    {
      user_id: 3,
      filename: "b502a3ff-b04d-4c8b-9411-4d7f1d133f8f.png",
      style: "spiky hair hairstyle",
    },
    {
      user_id: 3,
      filename: "d2c6fbb9-4c43-40e3-a9d8-16e4afb89eef.png",
      style: "taper cut hairstyle",
    },
    {
      user_id: 3,
      filename: "f175d352-fc1d-441d-ba7b-b93a2fded535.png",
      style: "the rachel hairstyle",
    },
  ]);

  // Inserts seed entries (bookings)
  let bookings = [
    { date: "2024-03-29", time: "10:00" }, //user_id: 1 C
    { date: "2024-03-29", time: "10:00" }, //user_id: 2 P
    { date: "2024-03-29", time: "11:00" }, //user_id: 3 P
    { date: "2024-03-29", time: "12:00" }, //user_id: 1 C
    { date: "2024-03-29", time: "13:00" }, //user_id: 1 P
    { date: "2024-03-29", time: "13:00" }, //user_id: 2 C
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
      remarks: "Fuck postgres",
      image_id: 1,
    },
    {
      user_id: 3,
      datetime: moment(
        `${bookings[2].date} ${bookings[2].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Haircut Wash Style",
      remarks: "Fuck postgres",
    },
    {
      user_id: 1,
      datetime: moment(
        `${bookings[3].date} ${bookings[3].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Style Perming",
      remarks: "Fuck postgres",
    },
    {
      user_id: 1,
      datetime: moment(
        `${bookings[4].date} ${bookings[4].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Style Perming",
      remarks: "Fuck postgres",
    },
    {
      user_id: 2,
      datetime: moment(
        `${bookings[5].date} ${bookings[5].time}`,
        "YYYY-MM-DD hh:mm"
      ).format("YYYY-MM-DD HH:mm"),
      purpose: "Style Perming",
      remarks: "Fuck postgres",
    },
  ]);
}
