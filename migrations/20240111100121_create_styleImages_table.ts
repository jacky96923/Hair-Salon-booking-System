import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("styleImages", function (table) {
    table.increments("id").primary();
    table.integer("image").unsigned();
    table
      .integer("styleList_id")
      .unsigned()
      .references("id")
      .inTable("styleList");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("styleImages");
}
