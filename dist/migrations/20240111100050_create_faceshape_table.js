"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("faceshape", function (table) {
        table.increments().primary();
        table.string("shape", 60);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("faceshape");
}
exports.down = down;
