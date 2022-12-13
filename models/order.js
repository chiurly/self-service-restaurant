import mongoose from 'mongoose';

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

export default mongoose.model('Order', orderSchema);
