import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("style_match", function (table) {
    table.increments().primary();
    table
      .integer("style_list_id")
      .unsigned()
      .references("id")
      .inTable("style_list");
    table
      .integer("faceshape_id")
      .unsigned()
      .references("id")
      .inTable("faceshape");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("style_match");
}
