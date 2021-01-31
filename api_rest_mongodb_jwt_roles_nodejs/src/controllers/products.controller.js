import Product from '../models/Product'

export const createProduct = async (req, res) => {

    const { name, category, price, imgURL } = req.body
    const newProduct = new Product({
        name: name,
        category: category,
        price: price,
        imgURL: imgURL
    })

    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
}

export const getProductById = async (req, res) => {
    const productId = await Product.findById(req.params.productId)
    res.status(200).json(productId)
}

export const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, req.body, {
        new: true
    })

    res.status(200).json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.body.productId)

    res.status(204).json()
}