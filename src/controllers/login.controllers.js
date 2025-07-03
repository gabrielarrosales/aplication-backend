import supabase from "../utils/supabaseClient.js";
import { generarToken } from "../authentication.js";

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !user) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }
        if (user.password !== password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = generarToken({ id: user.iduser, username: user.username, role: user.idroll });
        res.json({ 
            mensaje: "Login exitoso",
            usuario: {
                id: user.iduser,
                username: user.username,
                role: user.idroll,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}