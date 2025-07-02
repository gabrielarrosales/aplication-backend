import {
    getAllReservations,
    getReservationById,
    createNewReservation,
    deleteReservationById,
    updateReservationById
} from '../models/reservation.models.js';

import { reservationSchema } from '../utils/zodSchemas.js'; // Asegúrate de crear este schema

export const getReservations = async (req, res, next) => {
    try {
        const reservations = await getAllReservations();
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

export const getOneReservation = async (req, res, next) => {
    try {
        const reservation = await getReservationById(req.params.idreservation);
        res.json(reservation);
    } catch (error) {
        next(error);
    }
};

export const createReservation = async (req, res, next) => {
    try {
        const validatedData = reservationSchema.parse(req.body);
        const newReservation = await createNewReservation(validatedData);
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error al crear la reserva:', error.message);
        next(error);
    }
};

export const deleteReservation = async (req, res, next) => {
    try {
        const deletedReservation = await deleteReservationById(req.params.idreservation);
        res.json({ message: 'Reserva eliminada', deletedReservation });
    } catch (error) {
        next(error);
    }
};

export const updateReservation = async (req, res, next) => {
    try {
        const validatedData = reservationSchema.partial().parse(req.body);
        const updatedReservation = await updateReservationById(req.params.idreservation, validatedData);
        res.json(updatedReservation);
    } catch (error) {
        console.error('Error al actualizar la reserva:', error.message);
        next(error);
    }
};


export const getFilteredReservations = async (req, res, next) => {
    try {
        const { iduser, idservice, id_employee, date } = req.query;
        const filters = {};

        if (iduser) filters.iduser = parseInt(iduser);
        if (idservice) filters.idservice = parseInt(idservice);
        if (id_employee) filters.id_employee = parseInt(id_employee);
        if (date) filters.date = date;

        const reservations = await getReservationsWithFilters(filters);
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};