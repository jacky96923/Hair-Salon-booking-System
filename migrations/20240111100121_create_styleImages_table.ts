import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("style_images", function (table) {
    table.increments("id").primary();
    table.string("image", 255).unsigned();
    table
      .integer("style_list_id")
      .unsigned()
      .references("id")
      .inTable("style_list");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("style_images");
}
