import {Router} from 'express';
import {getUsers, getOneUser , createUser, deleteUser, updateUser} from '../controllers/users.controllers.js';
import { authMiddleware, authorizeRoles } from "../middlewares/authJwt.js";

const router = Router();

//traer todos los usuarios
router.get('/users', authMiddleware, authorizeRoles(1), getUsers);

//traer un usuario en especifico 
router.get('/users/:iduser', authMiddleware, authorizeRoles(1), getOneUser);

//aqui se recibe un dato atraves de request body
router.post('/users',authMiddleware, authorizeRoles(1), createUser);

//eliminar un usuario
router.delete('/users/:iduser',authMiddleware, authorizeRoles(1), deleteUser )

//actualizar un usuario 
router.put('/users/:iduser',authMiddleware, authorizeRoles(1), updateUser)

export default router;