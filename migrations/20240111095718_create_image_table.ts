import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("image", function (table) {
    table.increments().primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.string("filename", 255);
    table.string("style", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("image");
}
