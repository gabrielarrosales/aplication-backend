import { pool } from '../db.js';

// Obtener todos los servicios
export const getAllServices = async () => {
    const result = await pool.query('SELECT * FROM services');
    return result.rows;
};

// Obtener un servicio por ID
export const getServiceById = async (id) => {
    const result = await pool.query('SELECT * FROM services WHERE idservice = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo servicio
export const createNewService = async (data) => {
    const result = await pool.query(
        'INSERT INTO services (servicename, idcategory, idtype, duration, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [data.servicename, data.idcategory, data.idtype, data.duration, data.price]
    );
    return result.rows[0];
};

// Eliminar un servicio
export const deleteServiceById = async (id) => {
    const result = await pool.query('DELETE FROM services WHERE idservice = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Actualizar un servicio
export const updateServiceById = async (id, userData) => {
    const fields = [];
    const values = [];

    let query = 'UPDATE services SET ';
    let counter = 1;

    const updatableFields = [
        'servicename',
        'idcategory',
        'idtype',
        'duration',
        'price'
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

    query += fields.join(', ') + ` WHERE idservice = $${counter} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
};