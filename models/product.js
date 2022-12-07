import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

export default mongoose.model('Product', productSchema);
