import { getAllEmployees, getEmployeeById, createNewEmployee, deleteEmployeeById,updateEmployeeById} from '../models/employees.models.js';

// Obtener todos los empleados
export const getEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.json(employees);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ message: 'Error al obtener empleados' });
    }
};

// Obtener un empleado por ID
export const getOneEmployee = async (req, res) => {
    try {
        const employee = await getEmployeeById(req.params.idemployee);
        if (!employee) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(employee);
    } catch (error) {
        console.error('Error al obtener empleado:', error);
        res.status(500).json({ message: 'Error al obtener empleado' });
    }
};

// Crear un nuevo empleado
export const createEmployee = async (req, res) => {
    try {
        const newEmployee = await createNewEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        if (error?.code === "23505") {
        return res.status(409).json({ message: 'El empleado ya existe' });
        }
        console.error('Error al crear empleado:', error);
        res.status(500).json({ message: 'Error al crear empleado' });
    }
};

// Eliminar un empleado
export const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await deleteEmployeeById(req.params.idemployee);
        if (!deletedEmployee) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json({ message: 'Empleado eliminado', deletedEmployee });
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        res.status(500).json({ message: 'Error al eliminar empleado' });
    }
};

// Actualizar un empleado
export const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await updateEmployeeById(req.params.idemployee, req.body);
        if (!updatedEmployee) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(updatedEmployee);
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
        res.status(500).json({ message: 'Error al actualizar empleado' });
    }
};