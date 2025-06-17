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
        (name, lastname, email, phonenumber, address, position, salary, hire_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
        [
        data.name,
        data.lastname,
        data.email,
        data.phonenumber,
        data.address,
        data.position,
        data.salary,
        data.hire_date || new Date()
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
        name = $1, 
        lastname = $2, 
        email = $3, 
        phonenumber = $4, 
        address = $5, 
        position = $6, 
        salary = $7, 
        hire_date = $8 
        WHERE idemployee = $9 
        RETURNING *`,
        [
        data.name,
        data.lastname,
        data.email,
        data.phonenumber,
        data.address,
        data.position,
        data.salary,
        data.hire_date,
        id
        ]
    );

    return result.rows[0];
};