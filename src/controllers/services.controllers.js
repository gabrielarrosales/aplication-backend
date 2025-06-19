import { getAllServices, getServiceById, createNewService, deleteServiceById, updateServiceById} from '../models/services.models.js';
import { serviceSchema } from '../utils/zodSchemas.js';

export const getServices = async (req, res, next) => {
    try {
        const services = await getAllServices();
        res.json(services);

    } catch (error) {
        next(error);
    }
};

export const getOneService = async (req, res, next) => {
    try {
        const service = await getServiceById(req.params.idservice);
        res.json(service);

    } catch (error) {
        next(error);
    }
};

export const createService = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);
        const validatedData = serviceSchema.parse(req.body);
        const newService = await createNewService(validatedData);
        res.status(201).json(newService);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};


export const deleteService = async (req, res, next) => {
    try {
        const deletedService = await deleteServiceById(req.params.idservice);
        res.json({ message: 'Servicio eliminado', deletedService });

    } catch (error) {
        next(error); 
    }
};


export const updateService = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = serviceSchema.partial().parse(req.body);

        const updatedService = await updateServiceById(req.params.idservice, validatedData);
        res.json(updatedService);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};