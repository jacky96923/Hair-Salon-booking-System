import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("style_list", function (table) {
    table.increments().primary();
    table.string("style", 255);
    table.boolean("special");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("style_list");
}
