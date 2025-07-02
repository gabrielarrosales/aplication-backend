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
    try {
        const result = await pool.query(
            `INSERT INTO users 
            (username, password, firstname, lastname, email, phonenumber, address, idroll, status, fecha_ingresado) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`,
            [data.username, data.password, data.firstname, data.lastname, data.email, data.phonenumber, data.address, data.idroll, data.status, new Date()]
    );
    
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error; // Propagar el error para manejarlo en el controlador
        
    }
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE iduser = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Actualizar un usuario por ID
export const updateUserById = async (id, userData) => {
    const fields = [];
    const values = [];

    let query = 'UPDATE users SET ';
    let counter = 1;

    const updatableFields = [
        'username',
        'password',
        'firstname',
        'lastname',
        'email',
        'phonenumber',
        'address',
        'idroll',
        'status'
    ];

    for (const field of updatableFields) {
        if (userData[field] !== undefined && userData[field] !== null) {
        fields.push(`${field} = $${counter}`);
        values.push(userData[field]);
        counter++;
        }
    }

    if (fields.length === 0) {
        throw new Error('No hay campos válidos para actualizar');
    }

    query += fields.join(', ') + ` WHERE iduser = $${counter} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
};


// Buscar usuario por username (para login)
export const getUserByUsername = async (username) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0]; 
    } catch (error) {
        throw error;
    }
};
