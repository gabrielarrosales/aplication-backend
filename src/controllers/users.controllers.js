import {getAllUsers, getUserById, createNewUser, deleteUserById, updateUserById} from '../models/users.models.js'; 
import { userSchema } from '../utils/zodSchemas.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.json(users);
        
    } catch (error) {
        next(error); 
    }
};

export const getOneUser = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.iduser);

        res.json(user);

    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = userSchema.parse(req.body);
        const newUser = await createNewUser(validatedData);

        res.status(201).json(newUser);

    } catch (error) {
        console.error('Error capturado:', error);
        next(error); 
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserById(req.params.iduser);
        res.json({ message: 'Usuario eliminado', deletedUser });

    } catch (error) {
        next(error); 
    }
};

export const updateUser = async (req, res, next) => {
    try {
        console.log('Datos recibidos:', req.body);

        const validatedData = userSchema.partial().parse(req.body);

        const updatedUser = await updateUserById(req.params.iduser, validatedData);
        res.json(updatedUser);

    } catch (error) {
        console.error('Error capturado:', error.message);
        next(error); 
    }
};
