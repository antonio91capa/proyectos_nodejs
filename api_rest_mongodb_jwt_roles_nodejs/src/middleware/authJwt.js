// Confirmar si el usuario envia el token, si es admin
import jwt from "jsonwebtoken";

import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

// Verificar token
export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    
    try {
        // Verificar si existe el token en la cabecera
        if (!token) return res.status(401).json({ message: "No token provided" })

        // Extraer la informacion del token
        const decoded = jwt.verify(token, config.SECRET)
        //console.log(decoded);
        
        // Obtener el id del token y asinarlo al request
        req.userId = decode.id;

        // Verificar si el id del token existe en la base de datos
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "User not found" })
        //console.log(decoded);

        next()
    } catch (error) {
        return res.status(400).json({ message: "Unauthorized" })
    }
}

// Si el usuario tiene el rol moderador, puede insertar, actualizar y eliminar un producto
// en caso contrario no puede realizar las acciones anteriores.
export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: "No Tienes permisos para ejecutar la accion" })
}

// Si el usuario tiene el rol admin, puede insertar, actualizar y eliminar un producto
// en caso contrario no puede realizar las acciones anteriores.
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: "No Tienes permisos para ejecutar la accion" })
}