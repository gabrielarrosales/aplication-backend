import { pool } from '../db.js';

// Obtener todos los empleados
export const getAllEmployees = async () => {
    const result = await pool.query('SELECT * FROM employees');
    return result.rows;
};

// Obtener un empleado por ID
export const getEmployeeById = async (id) => {
    const result = await pool.query('SELECT * FROM employees WHERE idemployee = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo empleado
export const createNewEmployee = async (data) => {
    const result = await pool.query(
        `INSERT INTO employees 
        (firstname, lastname, address, phonenumber, specialty, username, password, email) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
        [
        data.firstname,
        data.lastname,
        data.address,
        data.phonenumber,
        data.specialty,
        data.username,
        data.password,
        data.email,
        ]
    );

    return result.rows[0];
};

// Eliminar un empleado por ID
export const deleteEmployeeById = async (id) => {
    const result = await pool.query('DELETE FROM employees WHERE idemployee = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Actualizar un empleado por ID
export const updateEmployeeById = async (id, data) => {
    const result = await pool.query(
        `UPDATE employees SET 
        firstname = $1, 
        lastname = $2, 
        address = $3, 
        phonenumber = $4, 
        specialty = $5, 
        username = $6, 
        password = $7, 
        email= $8 
        WHERE idemployee = $9 
        RETURNING *`,
        [
        data.firstname,
        data.lastname,
        data.address,
        data.phonenumber,
        data.specialty,
        data.username,
        data.password,
        data.email,
        id
        ]
    );

    return result.rows[0];
};