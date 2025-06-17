import { pool } from '../db.js';

// Obtener todos los usuarios
export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE iduser = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo usuario
export const createNewUser = async (data) => {
    const result = await pool.query(
        `INSERT INTO users 
        (username, password, firstname, lastname, email, phonenumber, address, idroll, status, fecha_ingresado) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *`,
        [data.username, data.password, data.firstname, data.lastname, data.email, data.phonenumber, data.address, data.idroll, data.status, new Date()]
);

    return result.rows[0];
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE iduser = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Actualizar un usuario por ID
export const updateUserById = async (id, userData) => {
    const {
        username,
        password,
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        idroll,
        status
    } = userData;

    const result = await pool.query(
        `UPDATE users SET 
        username = $1, 
        password = $2, 
        firstname = $3, 
        lastname = $4, 
        email = $5, 
        phonenumber = $6, 
        address = $7, 
        idroll = $8, 
        status = $9  
        WHERE iduser = $10 
        RETURNING *`,
        [
        username,
        password,
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        idroll,
        status,
        id
        ]
    );

    return result.rows[0];
};