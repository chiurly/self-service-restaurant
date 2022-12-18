const request = require('supertest');
const app = require('../app');

describe('Products API', () => {
	it('GET /api/products --> products array', () => {
		return request(app)
			.get('/api/products')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(expect.arrayContaining([
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						type: expect.any(String),
						price: expect.any(Number),
						image: expect.any(String)
					})
				]));
			});
	});

	it('GET /api/products/:id --> specific product by ID', () => {
		return request(app)
			.get('/api/products/6390f02ea007689bcc125b6e')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						type: expect.any(String),
						price: expect.any(Number),
						image: expect.any(String)
					})
				);
			});
	});

	it('GET /api/products/:id --> 404 if not found', () => {
		return request(app).get('/api/products/000000000000000000000000').expect(404);
	});
});
