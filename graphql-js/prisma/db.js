import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function connectDB() {
  try {
    await pool.connect(); // Connect to database
    console.log("✅ PostgreSQL Connected!");
  } catch (err) {
    console.log("DB Connection Failed ", err);
    process.exit(1);
  }
}

export default connectDB;
export { pool };
