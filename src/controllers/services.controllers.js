import { pool } from '../db.js';


export const getServices = async (req, res) =>{

    const {rows} = await pool.query('SELECT * FROM services')
    res.json(rows);
}

export const getOneServices = async (req, res) =>{
    const {idservice} = req.params;
    const {rows} = await pool.query ('SELECT * FROM services WHERE idservice = $1', [idservice])
    
    if (rows.length === 0) {
        return res.status(404).json({
            message: 'Servicio no encontrado'
        });
    }
    res.json(rows);
}

export const createService = async (req, res) =>{
    try{
        const data =req.body;
    const {rows} = await pool.query(
        'INSERT INTO services (servicename, idcategory, idtype, duration, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [data.servicename, data.idcategory, data.idtype, data.duration, data.price]);

        return res.json(rows[0]);
        
    }catch (error) {

        if (error?.code === "23505"){
            return res.status(409).json({
                message: 'El servicio ya existe'
            });
        }

        return res.status(500).json({
            message: 'Error al crear el servicio'
        });
    }

}

export const deleteService = async (req, res) =>{
    const {idservice} = req.params;
    const {rowCount} = await pool.query ('DELETE  FROM services WHERE idservice = $1', [idservice])
    
    if (rowCount === 0) {
        return res.status(404).json({
            message: 'servicio no encontrado'
        });
    }
    
    return res.json ({
        message: 'servicio eliminado'
    });
}

export const updateService = async (req, res) =>{
    const {idservice} = req.params
    const data = req.body;

    const {rows} = await pool.query('UPDATE services SET servicename = $1, idcategory = $2, idtype = $3, duration = $4, price = $5 WHERE idservice = $6 RETURNING *', 
        [data.servicename, data.category, data.idtype, data.duration, data.price, idservice]
    )

    return res.json(rows[0]);
}