"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("roster", function (table) {
        table.increments().primary();
        table.timestamp("datetime");
        table.integer("man_count");
        table.integer("p_count").nullable();
        table.integer("c_count").nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("roster");
}
exports.down = down;
