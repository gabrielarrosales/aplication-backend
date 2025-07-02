import prisma from '../../prisma/prismaClient.js';
import { serviceSchema } from '../utils/zodSchemas.js';

// Obtener todos los servicios
export const getServices = async (req, res, next) => {
    try {
        const services = await prisma.services.findMany();
        res.json(services);
    } catch (error) {
        console.error('Error al obtener servicios:', error.message);
        next(error); 
    }
};

// Obtener un servicio por ID
export const getOneService = async (req, res, next) => {
    try {
        const service = await prisma.services.findUnique({
            where: { idservice: Number(req.params.idservice) },
        });

        if (!service) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        res.json(service);
    } catch (error) {
        console.error('Error al obtener servicio:', error.message);
        next(error);
    }
};

// Crear un nuevo servicio
export const createService = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);
        const validatedData = serviceSchema.parse(req.body);

        const newService = await prisma.services.create({
            data: validatedData,
        });

        res.status(201).json(newService);
    } catch (error) {
        console.error('Error al crear servicio:', error.message);
        next(error);
    }
};

// Eliminar un servicio
export const deleteService = async (req, res, next) => {
    try {
        const deletedService = await prisma.services.delete({
            where: { idservice: Number(req.params.idservice) },
        });

        res.json({ message: 'Servicio eliminado', deletedService });
    } catch (error) {
        console.error('Error al eliminar servicio:', error.message);
        next(error);
    }
};

// Actualizar un servicio
export const updateService = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = serviceSchema.partial().parse(req.body);

        const updatedService = await prisma.services.update({
            where: { idservice: Number(req.params.idservice) },
            data: validatedData,
        });

        res.json(updatedService);
    } catch (error) {
        console.error('Error al actualizar servicio:', error.message);
        next(error);
    }
};