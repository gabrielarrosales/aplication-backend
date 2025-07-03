import supabase from '../utils/supabaseClient.js';
import { serviceSchema } from '../utils/zodSchemas.js';

// Obtener todos los servicios
export const getServices = async (req, res, next) => {
    try {
        const { data: services, error } = await supabase.from('services').select('*');
        if (error) throw error;
        res.json(services);
    } catch (error) {
        console.error('Error al obtener servicios:', error.message);
        next(error); 
    }
};

// Obtener un servicio por ID
export const getOneService = async (req, res, next) => {
    try {
        const { data: service, error } = await supabase
            .from('services')
            .select('*')
            .eq('idservice', req.params.idservice)
            .single();
        if (error) throw error;
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

        const { data: newService, error } = await supabase
            .from('services')
            .insert([validatedData])
            .select()
            .single();
        if (error) throw error;

        res.status(201).json(newService);
    } catch (error) {
        console.error('Error al crear servicio:', error.message);
        next(error);
    }
};

// Eliminar un servicio
export const deleteService = async (req, res, next) => {
    try {
        const { data: deletedService, error } = await supabase
            .from('services')
            .delete()
            .eq('idservice', req.params.idservice)
            .select()
            .single();
        if (error) throw error;

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

        const { data: updatedService, error } = await supabase
            .from('services')
            .update(validatedData)
            .eq('idservice', req.params.idservice)
            .select()
            .single();
        if (error) throw error;

        res.json(updatedService);
    } catch (error) {
        console.error('Error al actualizar servicio:', error.message);
        next(error);
    }
};