import { Router } from 'express';
import {
    getReservations,
    getOneReservation,
    createReservation,
    deleteReservation,
    updateReservation,
    getFilteredReservations
} from '../controllers/reservation.controllers.js';

import { authMiddleware, authorizeRoles } from "../middlewares/authJwt.js";

const router = Router();

// Obtener todas las reservas
router.get('/reservations', authMiddleware, authorizeRoles(1), getReservations);

// Obtener una reserva específica
router.get('/reservations/:idreservation', authMiddleware, authorizeRoles(1), getOneReservation);

// Crear una nueva reserva
router.post('/reservations', authMiddleware, authorizeRoles(1), createReservation);

// Eliminar una reserva
router.delete('/reservations/:idreservation', authMiddleware, authorizeRoles(1), deleteReservation);

// Actualizar una reserva
router.put('/reservations/:idreservation', authMiddleware, authorizeRoles(1), updateReservation);

// Obtener todas las reservas (con filtros)
//router.get('/reservations', authMiddleware, authorizeRoles(1), getFilteredReservations);

export default router;