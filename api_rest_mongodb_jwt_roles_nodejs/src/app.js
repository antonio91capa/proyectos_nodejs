import express from 'express'
import morgan from 'morgan';
import helmet from 'helmet';

import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from "./routes/auth.routes"
import userRoutes from './routes/user.routes'
import { createRoles, createAdmin } from './libs/initSetup'

const app = express()
createRoles();
createAdmin();

// Settings
app.set('pkg', pkg)
app.set("port", process.env.PORT || 4000)

// Middleware
const corsOptions = {

}
app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

// Routes
app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)

export default app;