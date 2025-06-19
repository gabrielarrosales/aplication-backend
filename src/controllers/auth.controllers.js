import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const JWT_SECRET = 'perrito1';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) return next(new ApiError('Usuario no encontrado', 404));

    if (user.password !== password) {
      return next(new ApiError('Contraseña incorrecta', 401));
    }

    // Generar token con rol
    const token = jwt.sign(
      {
        iduser: user.iduser,
        username: user.username,
        role: user.idroll
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    next(error);
  }
};