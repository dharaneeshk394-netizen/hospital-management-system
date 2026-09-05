const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

async function testDatabaseConnection() {
  try {
    const client = await pool.connect();

    console.log("PostgreSQL database connected successfully");

    client.release();
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);

    throw error;
  }
}

module.exports = {
  pool,
  testDatabaseConnection,
};