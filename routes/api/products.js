const express = require('express')
const Product = require('../../models/product')

const router = express.Router()

const getProduct = async (request, response, next) => {
  let product
  try {
    product = await Product.findById(request.params.id)
    if (product == null) {
      return response.status(404).json({ message: 'Cannot find product' })
    }
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
  response.product = product
  next()
}

router.get('/', async (request, response) => {
  try {
    const products = await Product.find()
    response.json(products)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

router.get('/:id', getProduct, (request, response) => {
  response.json(response.product)
})

router.post('/', async (request, response) => {
  const product = new Product({
    name: request.body.name,
    type: request.body.type,
    price: request.body.price,
    image: request.body.image,
    stock: request.body.stock,
  })
  try {
    const newProduct = await product.save()
    response.status(201).json(newProduct)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.patch('/:id', getProduct, async (request, response) => {
  let keys = ['name', 'type', 'price', 'image', 'stock']

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    if (request.body[key] != null) {
      response.product[key] = request.body[key]
    }
  }

  try {
    const updatedProduct = await response.product.save()
    response.json(updatedProduct)
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

router.delete('/:id', getProduct, async (request, response) => {
  try {
    await response.product.remove()
    response.json({ message: 'Deleted product' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

module.exports = router
