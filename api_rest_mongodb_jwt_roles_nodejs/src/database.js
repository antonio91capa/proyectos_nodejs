import { config } from 'dotenv/types'
import mongoose from 'mongoose'
import config from "./config"

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then((db) => console.log('MongoDB connected'))
    .catch(error => console.log(error))