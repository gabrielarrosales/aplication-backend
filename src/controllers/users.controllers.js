import { pool } from '../db.js';


export const getUsers = async (req, res) =>{

    const {rows} = await pool.query('SELECT * FROM users')
    res.json(rows);
}

export const getOneUser = async (req, res) =>{
    const {iduser} = req.params;
    const {rows} = await pool.query ('SELECT * FROM users WHERE iduser = $1', [iduser])
    
    if (rows.length === 0) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
    res.json(rows);
}

export const createUser = async (req, res) =>{
    try{
        const data =req.body;
    const {rows} = await pool.query(
        'INSERT INTO users (username, password, firstname, lastname, email, phonenumber, address, idroll, status,  fecha_ingresado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
        [data.username, data.password, data.firstname, data.lastname, data.email, data.phonenumber, data.address, data.idroll, data.status, new Date()]);

        return res.json(rows[0]);
        
    }catch (error) {

        if (error?.code === "23505"){
            return res.status(409).json({
                message: 'El usuario ya existe'
            });
        }

        return res.status(500).json({
            message: 'Error al crear el usuario'
        });
    }

}


export const deleteUser = async (req, res) =>{
    const {iduser} = req.params;
    const {rowCount} = await pool.query ('DELETE  FROM users WHERE iduser = $1', [iduser])
    
    if (rowCount === 0) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
    
    return res.json ({
        message: 'Usuario eliminado'
    });
}

export const updateUser = async (req, res) =>{
    const {iduser} = req.params
    const data = req.body;

    const {rows} = await pool.query('UPDATE users SET username = $1, password = $2, firstname = $3, lastname = $4, email = $5, phonenumber = $6, address = $7, idroll = $8, status = $9  WHERE iduser = $10 RETURNING *', 
        [data.username, data.password, data.firstname, data.lastname, data.email, data.phonenumber, data.address, data.idroll, data.status, iduser]
        
    )

    return res.json(rows[0]);
}