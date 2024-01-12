import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("roster", function (table) {
    table.increments().primary();
    table.timestamp("datetime");
    table.integer("man_count");
    table.integer("p_count").nullable();
    table.integer("c_count").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("roster");
}
