import supabase from '../utils/supabaseClient.js';
import { employeeSchema } from '../utils/zodSchemas.js';

// Obtener todos los empleados con Supabase
export const getEmployees = async (req, res, next) => {
    try {
        const { data: employees, error } = await supabase.from('employees').select('*');
        if (error) throw error;
        res.json(employees);
    } catch (error) {
        next(error); 
    }
};

// Obtener un empleado por idemployee con Supabase
export const getOneEmployee = async (req, res, next) => {
    try {
        const { data: employee, error } = await supabase
            .from('employees')
            .select('*')
            .eq('idemployee', req.params.idemployee)
            .single();
        if (error) throw error;
        if (!employee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(employee);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo empleado con Supabase
export const createEmployee = async (req, res, next) => {
    try {
        const validatedData = employeeSchema.parse(req.body);
        const { data: newEmployee, error } = await supabase
            .from('employees')
            .insert([validatedData])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(newEmployee);
    } catch (error) {
        next(error); 
    }
};

// Eliminar un empleado por idemployee con Supabase
export const deleteEmployee = async (req, res, next) => {
    try {
        const { data: deletedEmployee, error } = await supabase
            .from('employees')
            .delete()
            .eq('idemployee', req.params.idemployee)
            .select()
            .single();
        if (error) throw error;
        res.json({ message: 'Empleado eliminado', deletedEmployee });
    } catch (error) {
        next(error); 
    }
};

// Actualizar un empleado por idemployee con Supabase
export const updateEmployee = async (req, res, next) => {
    try {
        const validatedData = employeeSchema.partial().parse(req.body);
        const { data: updatedEmployee, error } = await supabase
            .from('employees')
            .update(validatedData)
            .eq('idemployee', req.params.idemployee)
            .select()
            .single();
        if (error) throw error;
        res.json(updatedEmployee);
    } catch (error) {
        next(error); 
    }
};