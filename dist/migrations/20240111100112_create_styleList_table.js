"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("style_list", function (table) {
        table.increments().primary();
        table.string("style", 255);
        table.boolean("special");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("style_list");
}
exports.down = down;
