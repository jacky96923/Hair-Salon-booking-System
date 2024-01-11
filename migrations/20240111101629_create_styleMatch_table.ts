import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("styleMatch", function (table) {
    table.increments("id").primary();
    table
      .integer("styleList_id")
      .unsigned()
      .references("id")
      .inTable("styleList");
    table
      .integer("faceshape_id")
      .unsigned()
      .references("id")
      .inTable("faceshape");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("styleMatch");
}
