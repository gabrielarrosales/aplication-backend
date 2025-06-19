import jwt from 'jsonwebtoken';

const SECRET_KEY = 'perrito1';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 

        next();
    } catch (err) {
        return res.status(401).json({ mensaje: "Token inválido"});
    }
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ mensaje: "No tienes permisos para acceder a este recurso" });
        }
        next();
    };
}