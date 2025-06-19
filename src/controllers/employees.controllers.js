import { getAllEmployees, getEmployeeById, createNewEmployee, deleteEmployeeById,updateEmployeeById} from '../models/employees.models.js';
import { employeeSchema } from '../utils/zodSchemas.js';

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (error) {
    next(error); 
  }
};

export const getOneEmployee = async (req, res, next) => {
  try {
    const employee = await getEmployeeById(req.params.idemployee);
    res.json(employee);

  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = employeeSchema.parse(req.body);
        const newEmployee = await createNewEmployee(validatedData);
        res.status(201).json(newEmployee);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};

export const deleteEmployee = async (req, res, next) => {
    try {
        const deletedEmployee = await deleteEmployeeById(req.params.idemployee);
        res.json({ message: 'Empleado eliminado', deletedEmployee });

    } catch (error) {
        next(error); 
    }
};

// Actualizar un empleado
export const updateEmployee = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = employeeSchema.partial().parse(req.body);

        const updatedEmployee = await updateEmployeeById(req.params.idemployee, validatedData);
        res.json(updatedEmployee);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};