import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 60);
    table.string("email", 255);
    table.string("password", 60);
    table.timestamp("created_at");
    table.timestamp("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
