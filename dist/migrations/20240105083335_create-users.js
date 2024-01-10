"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments();
        table.string("name");
        table.string("email");
        table.string("password");
        table.timestamps(false, true);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable("users");
}
exports.down = down;
