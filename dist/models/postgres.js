"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresPool = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    password: process.env.POSTGRES_PASS,
    database: "riani_ecommerce",
    host: "localhost",
    port: 5432,
});
exports.postgresPool = pool;
//# sourceMappingURL=postgres.js.map