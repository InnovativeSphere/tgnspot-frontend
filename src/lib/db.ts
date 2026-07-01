import { Pool } from 'pg'

// Reads from your .env.local DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const query = (text: string, params: (string | number)[] = []) => {
  return pool.query(text, params)
}