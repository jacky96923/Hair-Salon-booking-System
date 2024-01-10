"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
let knex;
beforeAll(() => {
    knex = (0, db_1.createKnex)();
});
afterAll(async () => {
    await knex.destroy();
});
describe("Migration TestSuit", () => {
    it("should rollback all migrations", async () => {
        let config = undefined;
        let all = true;
        await knex.migrate.rollback(config, all);
    });
    it("should migrate to latest version", async () => {
        await knex.migrate.latest();
    });
});
// describe('Seed TestSuit', () => {
//   it('should populate seed data', async () => {
//     await knex.seed.run()
//     let tables = ['user', 'memo']
//     for (let table of tables) {
//       let row = await knex.count('id as count').from(table).first()
//       expect(+row.count).toBeGreaterThan(0)
//     }
//   })
// })
