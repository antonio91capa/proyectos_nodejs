'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config/config')

//const port = config.port;

mongoose.connect(config.db, (err, res) => {
    if (err) return console.log(`Error al conectar a la base de datos: ${err}`)

    console.log('Conectado a la base de datos establecida...');

   /* app.listen(config.port, () => {
        console.log(`Server is up on port: ${config.port}`);
    })*/
})

app.listen(config.port, () => {
    console.log(`Server is up on port: ${config.port}`);
})