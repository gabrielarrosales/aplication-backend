import prisma from '../../prisma/prismaClient.js';
import { employeeSchema } from '../utils/zodSchemas.js';

export const getEmployees = async (req, res, next) => {
    try {
        const employees = await prisma.employees.findMany();
        res.json(employees);
    } catch (error) {
        next(error); 
    }
};

export const getOneEmployee = async (req, res, next) => {
    try {
        const employee = await prisma.employees.findUnique({
            where: { idemployee: Number(req.params.idemployee) },
        });

        if (!employee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        res.json(employee);

    } catch (error) {
        next(error);
    }
};

export const createEmployee = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = employeeSchema.parse(req.body);
        const newEmployee = await prisma.employees.create({ data: validatedData });
        res.status(201).json(newEmployee);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};

export const deleteEmployee = async (req, res, next) => {
    try {
        const deletedEmployee = await prisma.employees.delete({
            where: { idemployee: Number(req.params.idemployee) },
        });

        res.json({ message: 'Empleado eliminado', deletedEmployee });

    } catch (error) {
        next(error); 
    }
};

export const updateEmployee = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = employeeSchema.partial().parse(req.body);

        const updatedEmployee = await prisma.employees.update({
            where: { idemployee: Number(req.params.idemployee) },
            data: validatedData,
        });

        res.json(updatedEmployee);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};