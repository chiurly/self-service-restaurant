import express from 'express';
import Order from '../../models/order.js';

const router = express.Router();

const getOrder = async (request, response, next) => {
	let order;
	try {
		order = await Order.findById(request.params.id);
		if (order == null) {
			return response.status(404).json({ message: 'Cannot find order' });
		}
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
	response.order = order;
	next();
}

router.get('/', async (request, response) => {
	try {
		const orders = await Order.find();
		response.json(orders);
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
});

router.get('/incomplete', async (request, response) => {
	try {
		const incompleteOrders = await Order.find({
			dateCompleted: null
		});
		response.json(incompleteOrders);
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
});

router.get('/:id', getOrder, (request, response) => {
	response.json(response.order);
});

router.post('/', async (request, response) => {
	const order = new Order({
		products: request.body.products
	});
	try {
		const newOrder = await order.save();
		response.status(201).json(newOrder);
	} catch (error) {
		response.status(400).json({ message: error.message });
	}
});

router.patch('/:id', getOrder, async (request, response) => {
	if (request.body.dateCreated != null) {
		response.order.dateCreated = request.body.dateCreated;
	}
	if (request.body.dateCompleted != null) {
		response.order.dateCompleted = request.body.dateCompleted;
	}
	if (request.body.products != null) {
		response.order.products = request.body.products;
	}
	try {
		const updatedOrder = await response.order.save();
		response.json(updatedOrder);
	} catch (error) {
		response.status(400).json({ message: error.message });
	}
});

router.delete('/:id', getOrder, async (request, response) => {
	try {
		await response.order.remove();
		response.json({ message: 'Deleted order' });
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
});

export default router;
