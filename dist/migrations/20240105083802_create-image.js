"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('image', (table) => {
        table.increments();
        table.string("filename");
        table.integer("user_id");
        table.foreign("user_id").references("users.id");
        table.timestamps(false, true);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('image');
}
exports.down = down;
