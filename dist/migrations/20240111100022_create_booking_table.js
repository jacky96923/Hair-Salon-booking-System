"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("booking", function (table) {
        table.increments().primary();
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.timestamp("datetime");
        table.text("remarks");
        table.string("purpose", 60);
        table.integer("image_id").unsigned().references("id").inTable("image");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("booking");
}
exports.down = down;
