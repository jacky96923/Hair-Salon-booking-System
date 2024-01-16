"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
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
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("style_match");
}
exports.down = down;
