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
export const updateServiceById = async (id, data) => {
    const result = await pool.query(
        'UPDATE services SET servicename = $1, idcategory = $2, idtype = $3, duration = $4, price = $5 WHERE idservice = $6 RETURNING *',
        [data.servicename, data.idcategory, data.idtype, data.duration, data.price, id]
    );
    return result.rows[0];
};