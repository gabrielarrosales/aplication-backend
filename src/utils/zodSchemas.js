//aqui se establecen los esquemas de validacion para cada uno 

import { z } from 'zod';

//users
export const userSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es obligatorio',
        }).min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
        }).max(20, {
        message: 'El nombre de usuario no puede exceder los 20 caracteres'
        }),
    password: z.string({
        required_error: 'La contraseña es obligatoria'
        }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
        }),
    email: z.string({
        required_error: 'El correo electrónico es obligatorio'
        }).email({
        message: 'Debe ser un correo electrónico válido'
        }),

    firstname: z.string({
        required_error: 'El nombre es obligatorio'
        }).min(2, {
            message: 'El nombre debe tener al menos 2 caracteres'
        }),
    
    lastname: z.string({
        required_error: 'El apellido es obligatorio'
        }).min(2, {
            message: 'El apellido debe tener al menos 2 caracteres'
        }),

    phonenumber: z.string({
        required_error: 'El número de teléfono es obligatorio'
    }).min(11, {
        message: 'El número de teléfono debe tener al menos 11 dígitos'
    }).max(11, {
        message: 'El número de teléfono no puede superar los 11 dígitos'
    }),

    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
    idroll: z.number({ required_error: 'El rol es obligatorio' }).int().positive(),
});

//employees
export const employeeSchema = z.object({

    firstname: z.string({ required_error: 'El nombre es obligatorio' })
        .min(2, 'El nombre debe tener al menos 2 caracteres'),

    lastname: z.string({ required_error: 'El apellido es obligatorio' })
        .min(2, 'El apellido debe tener al menos 2 caracteres'),

    address: z.string({ required_error: 'La dirección es obligatoria' })
        .min(5, 'La dirección debe tener al menos 5 caracteres'),

    phonenumber: z.string({
        required_error: 'El número de teléfono es obligatorio'
    }).min(11, {
        message: 'El número de teléfono debe tener al menos 11 dígitos'
    }).max(11, {
        message: 'El número de teléfono no puede superar los 11 dígitos'
    }),


    specialty: z.string({ required_error: 'La especialidad es obligatoria' })
        .min(3, 'La especialidad debe tener al menos 3 caracteres'),

    username: z.string({ required_error: 'El nombre de usuario es obligatorio' })
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .max(20, 'El nombre de usuario no puede superar los 20 caracteres'),

    password: z.string({ required_error: 'La contraseña es obligatoria' })
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    email: z.string({ required_error: 'El correo electrónico es obligatorio' })
        .email('Debe ser un correo electrónico válido')
});



//services
export const serviceSchema = z.object({
    servicename: z.string({
        required_error: 'El nombre del servicio es obligatorio',
    }).min(3, {
        message: 'El nombre del servicio debe tener al menos 3 caracteres'
    }),

    idcategory: z.number({
        required_error: 'La categoría es obligatoria',
    }).int().positive({
        message: 'La categoría debe ser un número positivo'
    }),

    idtype: z.number({
        required_error: 'El tipo de servicio es obligatorio',
    }).int().positive({
        message: 'El tipo debe ser un número positivo'
    }),

    duration: z.string({
        required_error: 'La duración es obligatoria'
    }).regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, {
        message: 'Formato de duración inválido. Usa HH:mm:ss (ej: 00:30:00)'
    }),

    price: z.number({
        required_error: 'El precio es obligatorio',
    }).positive({
        message: 'El precio debe ser mayor a cero'
    })
});
