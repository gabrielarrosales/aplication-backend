import { getAllServices, getServiceById, createNewService, deleteServiceById, updateServiceById} from '../models/services.models.js';


export const getServices = async (req, res) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};


export const getOneService = async (req, res) => {
    try {
        const service = await getServiceById(req.params.idservice);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json(service);
    } catch (error) {
        console.error('Error al obtener servicio:', error);
        res.status(500).json({ message: 'Error al obtener servicio' });
    }
};


export const createService = async (req, res) => {
    try {
        const newService = await createNewService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        if (error?.code === "23505") {
        return res.status(409).json({ message: 'El servicio ya existe' });
        }
        console.error('Error al crear servicio:', error);
        res.status(500).json({ message: 'Error al crear servicio' });
    }
};


export const deleteService = async (req, res) => {
    try {
        const deletedService = await deleteServiceById(req.params.idservice);
        if (!deletedService) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json({ message: 'Servicio eliminado', deletedService });
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({ message: 'Error al eliminar servicio' });
    }
};


export const updateService = async (req, res) => {
    try {
        const updatedService = await updateServiceById(req.params.idservice, req.body);
        if (!updatedService) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json(updatedService);
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).json({ message: 'Error al actualizar servicio' });
    }
};