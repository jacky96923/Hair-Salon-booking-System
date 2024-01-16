"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
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
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("style_images");
}
exports.down = down;
