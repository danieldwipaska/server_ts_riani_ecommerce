import pkg from "pg";
const { Pool } = pkg;
// const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.POSTGRES_PASS,
  database: "riani_ecommerce",
  host: "localhost",
  port: 5432,
});

export { pool as postgresPool };
