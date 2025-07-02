import { pool } from '../db.js';

// Obtener todas las reservas
export const getAllReservations = async () => {
    const result = await pool.query('SELECT * FROM reservation');
    return result.rows;
};

// Obtener una reserva por ID
export const getReservationById = async (id) => {
    const result = await pool.query('SELECT * FROM reservation WHERE idreservation = $1', [id]);
    return result.rows[0];
};

// Crear una nueva reserva
export const createNewReservation = async (data) => {
    try {
        const result = await pool.query(
            `INSERT INTO reservation 
            (iduser, idservice, date, hour, id_employee, status) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [data.iduser, data.idservice, data.date, data.hour, data.id_employee, data.status || 'pendiente']
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        throw error;
    }
};

// Eliminar una reserva por ID
export const deleteReservationById = async (id) => {
    const result = await pool.query('DELETE FROM reservation WHERE idreservation = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Actualizar una reserva por ID
export const updateReservationById = async (id, reservationData) => {
    const fields = [];
    const values = [];

    let query = 'UPDATE reservation SET ';
    let counter = 1;

    const updatableFields = ['iduser', 'idservice', 'date', 'hour', 'id_employee', 'status'];

    for (const field of updatableFields) {
        if (reservationData[field] !== undefined && reservationData[field] !== null) {
            fields.push(`${field} = $${counter}`);
            values.push(reservationData[field]);
            counter++;
        }
    }

    if (fields.length === 0) {
        throw new Error('No hay campos válidos para actualizar');
    }

    query += fields.join(', ') + ` WHERE idreservation = $${counter} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getReservationsWithFilters = async (filters) => {
    let query = 'SELECT * FROM reservation WHERE TRUE';
    const values = [];
    let counter = 1;

    if (filters.iduser) {
        query += ` AND iduser = $${counter}`;
        values.push(filters.iduser);
        counter++;
    }

    if (filters.idservice) {
        query += ` AND idservice = $${counter}`;
        values.push(filters.idservice);
        counter++;
    }

    if (filters.id_employee) {
        query += ` AND id_employee = $${counter}`;
        values.push(filters.id_employee);
        counter++;
    }

    if (filters.date) {
        // Puedes usar =, >=, <= u otros según necesites
        query += ` AND date = $${counter}`;
        values.push(filters.date);
        counter++;
    }

    const result = await pool.query(query, values);
    return result.rows;
};