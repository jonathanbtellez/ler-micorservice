import { pool } from "../db/index.js";
import { info, error } from "../utils/logger.js";

export const createUsersTable = async () => {
  try {
    info('Creating users table...');
    const query = `
          CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100),
          age INT
        );
      `;
    await pool.query(query);
    info('Users table created successfully!');
  } catch (err) { 
    console.log({ err })
    error(`Error creating users table: ${err}`);
  }
}

export const insertUserData = async () => {

  try {

    info('Inserting data into users table...');
    const user = await pool.query("SELECT * FROM users LIMIT 1")

    if (user.rows.length > 0) {
      info('Users table already has data!');
      return;
    }


    await createUsers('Juan Carlos', 'juanca@correo.com', 25);
    await createUsers('Maria Camila', 'maca@correo.com', 30);
    await createUsers('Pedro Ramirez', 'perami@correo.com', 40);
    await createUsers('Luisa Fernandez', 'luifer@gmail.com', 35);
    await createUsers('Carlos Perez', 'caper@correo.com', 45);

    info("Users data inserted successfully!");

  } catch (err) {
    error('Error inserting data:', err.message);
  }
};

const createUsers = async (name, email, age) => {
  await pool.query(
    'INSERT INTO "users" (name, email, age) VALUES ($1, $2, $3);',
    [name, email, age]
  );
}
