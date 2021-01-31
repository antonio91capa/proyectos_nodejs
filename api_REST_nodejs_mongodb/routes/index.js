'use strict'

const express = require('express')

const productController = require('../controllers/product-controller')
const userController = require('../controllers/auth')
const auth = require('../middleware/auth_middleware')
const api = express.Router()

/*------------- Peticiones a la url de Product Controller ----------------- */
api.get('/product', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deleteProduct)

/*api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)

api.get('/private', auth, function (req, res) {
    res.status(200).send({ message: 'Tienes acceso' })
})*/

module.exports = api