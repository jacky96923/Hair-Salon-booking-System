import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("faceshape", function (table) {
    table.increments("id").primary();
    table.string("shape", 60);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("faceshape");
}
