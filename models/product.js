import mongoose from 'mongoose';

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
		default: "shopping-cart"
	}
});

export default mongoose.model('Product', productSchema);
