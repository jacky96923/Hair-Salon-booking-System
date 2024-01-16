"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments().primary();
        table.string("name", 60);
        table.string("email", 255);
        table.string("password", 60);
        table.timestamp("created_at");
        table.timestamp("updated_at");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("users");
}
exports.down = down;
