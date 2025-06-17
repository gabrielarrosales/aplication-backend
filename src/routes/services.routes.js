import { Router } from 'express';
import { deleteService, createService, getOneServices, getServices, updateService } from '../controllers/services.controllers.js';

const router = Router();

//traer todos los servicios
router.get('/services', getServices);

//traer un servicio especifico
router.get('/services/:idservice', getOneServices);

//crear un nuevo servicio
router.post('/services', createService);

//eliminar un servicio
router.delete('/services/:idservice', deleteService );

//actualizar un servicio
router.put('/services/:idservice', updateService);

export default router;