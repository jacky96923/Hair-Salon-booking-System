import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("booking", function (table) {
    table.increments().primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.timestamp("datetime");
    table.text("remarks");
    table.string("purpose", 60);
    table.integer("image_id").unsigned().references("id").inTable("image");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("booking");
}
