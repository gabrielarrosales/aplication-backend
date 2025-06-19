import { pool } from "../db.js";

export async function findUserByUsername(username) {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0]; 
}