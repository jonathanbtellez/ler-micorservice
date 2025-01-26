import { pool } from "../db/index.js"
import User from "../model/user.js"

export const findAll = async () => {
    const usersDb = await pool.query('SELECT * FROM users')
    return usersDb.rows.map(user => new User(user.id, user.name, user.email, user.age))
}

export const save = async (user) => {
    await pool.query(
        'INSERT INTO "users" (name, email, age) VALUES ($1, $2, $3);',
        [user.name, user.email, user.age]
    );
}

export const update = async (id, user) => {
    await pool.query(
        'UPDATE "users" SET name = $1, email = $2, age = $3 WHERE id = $4;',
        [user.name, user.email, user.age, id]
    );

    return await findById(id)
}

export const findById = async (id) => {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return user.rows.map(user => new User(user.id, user.name, user.email, user.age))[0]
}

export const remove = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
}

export const findByEmail = async (email) => {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return user.rows.map(user => new User(user.id, user.name, user.email, user.age))[0]
}

export const findByEmailLike = async (email) => {
    const users = await pool.query('SELECT * FROM users WHERE email like $1', [`%${email}%`])
    return users.rows.map(user => new User(user.id, user.name, user.email, user.age))
}