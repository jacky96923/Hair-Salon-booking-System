"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("image", function (table) {
        table.increments().primary();
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.string("filename", 255);
        table.string("style", 255);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("image");
}
exports.down = down;
