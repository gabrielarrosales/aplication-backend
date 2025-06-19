//Este es un error personalizado que usaremos para estandarizar todos los mensajes.

class ApiError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.errors = errors; 
        this.isOperational = true; 
    }
}

export default ApiError;

