const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
    default: 'shopping-cart'
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Product', productSchema)
