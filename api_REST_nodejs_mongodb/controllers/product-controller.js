'use strict'

const Product = require('../models/product')

/*------------ Obtener todos los productos ---------------- */
function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        if (!products) return res.status(404).send({ message: `No existen productos en la Base de datos` })

        res.status(200).send({ products })
    })
}

/*-------------- Obtener el producto por Id ----------------- */
function getProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        if (!product) return res.status(404).send({ message: `El producto no existe en la Base de Datos` })

        res.status(200).send({ product })
    })
}

/*--------------- Guardar el producto ------------------------------- */
function saveProduct(req, res) {
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `Error al guardar el registro en la Base de Datos: ${err}` })

        res.status(200).send({ product: productStored })
    })
}

/*----------------------- Editar el producto -------------------------- */
function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualiza el producto: ${err}` })

        res.status(200).send({ product: productUpdated })
    })
}

/*------------------------------ Eliminar el producto ------------------------- */
function deleteProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({ message: `Error al eliminar el producto: ${err}` })

        res.status(200).send({ message: 'El producto ha sido eliminado correctamente' })
    })
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}

