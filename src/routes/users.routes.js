import {Router} from 'express';
import {getUsers, getOneUser , createUser, deleteUser, updateUser} from '../controllers/users.controllers.js';

const router = Router();

//traer todos los usuarios
router.get('/users', getUsers);

//traer un usuario en especifico 
router.get('/users/', getOneUser)

//aqui se recibe un dato atraves de request body
router.post('/users', createUser);

//eliminar un usuario
router.delete('/users/:iduser', deleteUser )

//actualizar un usuario 
router.put('/user/:iduser', updateUser)

export default router;