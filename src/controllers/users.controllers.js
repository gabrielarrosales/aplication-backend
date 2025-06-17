import {getAllUsers, getUserById, createNewUser, deleteUserById, updateUserById} from '../models/users.models.js'; 

//el await es el que agarra todo y lo pausa
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};



export const getOneUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.iduser);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};


// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const newUser = await createNewUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        if (error?.code === "23505") {
        return res.status(409).json({ message: 'El usuario ya existe' });
        }
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserById(req.params.iduser);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await updateUserById(req.params.iduser, req.body);
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};
