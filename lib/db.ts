import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'paroki_sambiroto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool

// Helper: execute a query and return rows
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, params)
  return rows as T[]
}

// Helper: execute a query and return a single row
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params)
  return rows[0] || null
}

// Helper: execute an insert/update/delete and return the result
export async function execute(sql: string, params?: any[]) {
  const [result] = await pool.execute(sql, params)
  return result as mysql.ResultSetHeader
}
