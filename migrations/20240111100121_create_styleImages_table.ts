import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("styleImages", function (table) {
<<<<<<< HEAD
    table.increments("id").primary();
    table.string("image", 255).unsigned();
=======
    table.increments().primary();
    table.integer("image").unsigned();
>>>>>>> refs/remotes/origin/main
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
