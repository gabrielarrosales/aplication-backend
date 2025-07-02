import ApiError from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {

    const errors = {
        DUPLICATED: {
            message: "Registro duplicado",
            code: "DUPLICATED_"
        }
    }


let error = err;

if (error.name === 'ZodError') {
    return res.status(400).json({
        message: 'Datos inválidos',
        errors: error.flatten()
    });
}

if (error.code === '23505') {
    return res.status(409).json({
        message: 'Hay datos insertados ya existentes'
    });
}


if (error.code === '23502') {
    return res.status(400).json({
        message: 'Falta un campo obligatorio'
    });
}


return res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
});
};


