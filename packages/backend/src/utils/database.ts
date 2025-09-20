import mysql from "mysql2/promise";

const dbConfig: any = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3307"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "sangcan_noti",
  // Production optimizations
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
};

// Add SSL for production (Railway requires SSL)
if (process.env.NODE_ENV === 'production') {
  dbConfig.ssl = { rejectUnauthorized: false };
}

// Don't log sensitive info in production
if (process.env.NODE_ENV !== 'production') {
  console.log("🔧 Database config:", { ...dbConfig, password: '***' });
} else {
  console.log("🔧 Database connected to:", dbConfig.host);
}

export const db = mysql.createPool(dbConfig);

// Initialize database tables
export const initDatabase = async () => {
  try {
    // Create users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Database tables initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    throw error;
  }
};
