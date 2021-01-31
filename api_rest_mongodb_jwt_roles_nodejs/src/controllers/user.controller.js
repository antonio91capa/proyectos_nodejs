import Role from "../models/Role"
import User from "../models/User"

export const createUser = async (req, res) => {
    try {
        const { email, username, password, roles } = req.body
        const rolesFound = await Role.find({ name: { $in: roles } })

        // Create new user
        const user = new User({
            email,
            username,
            password,
            roles: rolesFound.map((role) => role._id)
        })

        // Encrypt password
        user.password = await User.encryptPassword(user.password)

        const savedUser = await user.save()

        return res.status(200).json({ savedUser })
    } catch (error) {
        console.error(error);
    }
}