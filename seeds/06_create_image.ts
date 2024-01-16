import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("image").del();

  // Inserts seed entries
  await knex("image").insert([
    {
      user_id: 3,
      filename: "/7c3e97e2-0a74-4bce-beae-2339f36c53b4.png",
      style: "undercut hairstyle",
    },
    {
      user_id: 3,
      filename: "/21d0e378-9b67-4405-be62-97939fe5491c.png",
      style: "short hair hairstyle",
    },
    {
      user_id: 3,
      filename: "/b502a3ff-b04d-4c8b-9411-4d7f1d133f8f.png",
      style: "spiky hair hairstyle",
    },
    {
      user_id: 3,
      filename: "/d2c6fbb9-4c43-40e3-a9d8-16e4afb89eef.png",
      style: "taper cut hairstyle",
    },
    {
      user_id: 3,
      filename: "/f175d352-fc1d-441d-ba7b-b93a2fded535.png",
      style: "the rachel hairstyle",
    },
  ]);
}
