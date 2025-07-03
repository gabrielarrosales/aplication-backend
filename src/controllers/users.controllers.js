import {getAllUsers, getUserById, createNewUser, deleteUserById, updateUserById} from '../models/users.models.js'; 
import { userSchema } from '../utils/zodSchemas.js';
import supabase from '../utils/supabaseClient.js';

// Obtener todos los usuarios
export const getUsers = async (req, res, next) => {
    try {
        const { data: users, error } = await supabase.from('users').select('*');
        if (error) throw error;
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// Obtener un usuario por iduser
export const getOneUser = async (req, res, next) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('iduser', req.params.iduser)
            .single();
        if (error) throw error;
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res, next) => {
    try {
        const validatedData = userSchema.parse(req.body);
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([validatedData])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// Eliminar un usuario por iduser
export const deleteUser = async (req, res, next) => {
    try {
        const { data: deletedUser, error } = await supabase
            .from('users')
            .delete()
            .eq('iduser', req.params.iduser)
            .select()
            .single();
        if (error) throw error;
        res.json({ message: 'Usuario eliminado', deletedUser });
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario por iduser
export const updateUser = async (req, res, next) => {
    try {
        const validatedData = userSchema.partial().parse(req.body);
        const { data: updatedUser, error } = await supabase
            .from('users')
            .update(validatedData)
            .eq('iduser', req.params.iduser)
            .select()
            .single();
        if (error) throw error;
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};
