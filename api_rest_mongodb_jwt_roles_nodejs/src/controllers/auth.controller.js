import jwt from 'jsonwebtoken'

import User from "../models/User";
import Role from "../models/Role";
import config from "../config"

export const signup = async (req, res) => {
    try {
        const { email, username, password, roles } = req.body

        const userFind = User.find({ email })

        const newUser = new User({
            email,
            username,
            password: await User.encryptPassword(password)
        })

        /* 
        * Comprueba si el cuerpo del json tiene la propiedad roles
        * Si existe, busca en la base de datos el id de los roles y se lo asigna al usuario
        * No existe, busca en la base de datos el id del role "user" y se lo asigna al usuario
        */
        if (req.body.roles) {
            const roleFind = await Role.find({ name: { $in: roles } })
            newUser.roles = roleFind.map((role) => role._id)
        } else {
            const role = await Role.findOne({ name: "user" })
            newUser.roles = [role._id]
        }

        // Guarda el nuevo usuario a la base de datos
        const userSaved = await newUser.save();

        // Crea un nuevo token para el usuario
        const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
            expiresIn: 3600,    //1 hora
        })

        res.status(200).json({ userSaved, token })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const signin = (req, res) => {
    try {
        // Verificar si el email existe en la base de datos
        const userFound = await User.findOne({ emai: req.body.email }).populate("roles")
        if (!userFound) return res.status(400).json({ message: "User not found" })

        // Verificar si el password del request es igual al password encriptado
        const matchPassword = await User.comparedPassword(req.body.password, userFound.password)
        if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid Password" })

        // Crea un nuevo token para el usuario
        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 3600,    //1 hora
        })

        res.status(200).json({ userFound, token })
    } catch (error) {
        console.log(error);
    }
}