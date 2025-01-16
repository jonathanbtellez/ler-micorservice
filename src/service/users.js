import { pool } from "../db/index.js"
import User from "../model/user.js"

export const getUsersService = async () => {
    const usersDb = await pool.query('SELECT * FROM users')
    return usersDb.rows.map(user => new User(user.id, user.name, user.email, user.age))
}