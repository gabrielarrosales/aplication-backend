import { Router } from 'express';
import { deleteService, createService, getOneService, getServices, updateService } from '../controllers/services.controllers.js';
import { authMiddleware, authorizeRoles } from "../middlewares/authJwt.js";

const router = Router();

//traer todos los servicios
router.get('/services', authMiddleware, authorizeRoles(1, 2), getServices);

//traer un servicio especifico
router.get('/services/:idservice', authMiddleware, authorizeRoles(1, 2), getOneService);

//crear un nuevo servicio
router.post('/services', authMiddleware, authorizeRoles(1), createService);

//eliminar un servicio
router.delete('/services/:idservice', authMiddleware, authorizeRoles(1), deleteService );

//actualizar un servicio
router.put('/services/:idservice', authMiddleware, authorizeRoles(1), updateService);

export default router;