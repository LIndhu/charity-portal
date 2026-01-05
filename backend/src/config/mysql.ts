import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

/**
 * Initialize MySQL connection using Railway MYSQL_URL
 */
export const initMySQL = async (): Promise<void> => {
  try {
    const mysqlUrl = process.env.MYSQL_URL;

    if (!mysqlUrl) {
      throw new Error('MYSQL_URL environment variable not found');
    }

    pool = mysql.createPool(mysqlUrl);

    const connection = await pool.getConnection();
    console.log('✓ MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('✗ MySQL connection failed:', error);
    throw error;
  }
};

/**
 * Get MySQL pool
 */
export const getMySQLPool = (): mysql.Pool => {
  if (!pool) {
    throw new Error('MySQL pool not initialized. Call initMySQL() first.');
  }
  return pool;
};

/**
 * Run SELECT queries
 */
export const query = async <T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> => {
  const pool = getMySQLPool();
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
};

/**
 * Run SELECT single row
 */
export const queryOne = async <T = any>(
  sql: string,
  params: any[] = []
): Promise<T | null> => {
  const results = await query<T>(sql, params);
  return results.length ? results[0] : null;
};

/**
 * Run INSERT queries
 */
export const insert = async (
  sql: string,
  params: any[] = []
): Promise<number> => {
  const pool = getMySQLPool();
  const [result] = await pool.execute(sql, params);
  return (result as mysql.ResultSetHeader).insertId;
};

/**
 * Run UPDATE / DELETE queries
 */
export const update = async (
  sql: string,
  params: any[] = []
): Promise<number> => {
  const pool = getMySQLPool();
  const [result] = await pool.execute(sql, params);
  return (result as mysql.ResultSetHeader).affectedRows;
};

/**
 * Close MySQL pool
 */
export const closeMySQL = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('MySQL connection pool closed');
  }
};
