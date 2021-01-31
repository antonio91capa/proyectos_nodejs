// Verifica si el usuario es nuevo, si el rol ya fue creado
import { ROLES } from '../models/Role'
import User from '../models/User'

// Checar si los roles existen
export const checkRoleExists = (req, res, next) => {
    let flag = true
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                flag = false
            } else {
                flag = true
                break
            }
        }

        if (!flag) {
            return res.status(400).json({ message: `Role ${req.body.roles[i]} does not exists` })
        }
    }

    next()
}

// Checar si el username o el email estan duplicados
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).json({ message: 'The user already exists' })

    const email = await User.findOne({ email: req.body.email })
    if (email) return res.status(400).json({ message: 'Email already exists' })

    next()
}

