import supabase from '../utils/supabaseClient.js';
import { reservationSchema } from '../utils/zodSchemas.js';

// Obtener todas las reservas
export const getReservations = async (req, res, next) => {
    try {
        const { data: reservations, error } = await supabase.from('reservation').select('*');
        if (error) throw error;
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

// Obtener una reserva por idreservation
export const getOneReservation = async (req, res, next) => {
    try {
        const { data: reservation, error } = await supabase
            .from('reservation')
            .select('*')
            .eq('idreservation', req.params.idreservation)
            .single();
        if (error) throw error;
        res.json(reservation);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva reserva
export const createReservation = async (req, res, next) => {
    try {
        const validatedData = reservationSchema.parse(req.body);
        const { data: newReservation, error } = await supabase
            .from('reservation')
            .insert([validatedData])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error al crear la reserva:', error.message);
        next(error);
    }
};

// Eliminar una reserva por idreservation
export const deleteReservation = async (req, res, next) => {
    try {
        const { data: deletedReservation, error } = await supabase
            .from('reservation')
            .delete()
            .eq('idreservation', req.params.idreservation)
            .select()
            .single();
        if (error) throw error;
        res.json({ message: 'Reserva eliminada', deletedReservation });
    } catch (error) {
        next(error);
    }
};

// Actualizar una reserva por idreservation
export const updateReservation = async (req, res, next) => {
    try {
        const validatedData = reservationSchema.partial().parse(req.body);
        const { data: updatedReservation, error } = await supabase
            .from('reservation')
            .update(validatedData)
            .eq('idreservation', req.params.idreservation)
            .select()
            .single();
        if (error) throw error;
        res.json(updatedReservation);
    } catch (error) {
        console.error('Error al actualizar la reserva:', error.message);
        next(error);
    }
};

// Obtener reservas filtradas
export const getFilteredReservations = async (req, res, next) => {
    try {
        let query = supabase.from('reservation').select('*');
        const { iduser, idservice, id_employee, date } = req.query;

        if (iduser) query = query.eq('iduser', parseInt(iduser));
        if (idservice) query = query.eq('idservice', parseInt(idservice));
        if (id_employee) query = query.eq('id_employee', parseInt(id_employee));
        if (date) query = query.eq('date', date);

        const { data: reservations, error } = await query;
        if (error) throw error;
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};