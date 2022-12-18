const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateCompleted: {
        type: Date
    },
    products: {
        type: [String],
        required: true,
        default: undefined
    }
});

orderSchema.path('products').validate(value => value.length >= 1, 'must have minimum one product');

module.exports = mongoose.model('Order', orderSchema);
