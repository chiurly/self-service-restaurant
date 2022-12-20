const request = require('supertest')
const app = require('../app')

describe('Orders API', () => {
	it('GET /api/orders --> orders array', () => {
		return request(app)
			.get('/api/orders')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(expect.arrayContaining([
					expect.objectContaining({
						_id: expect.any(String),
						dateCreated: expect.any(String),
						products: expect.any(Array)
					})
				]))
			})
	})

	it('GET /api/orders/:id --> specific order by ID', () => {
		return request(app)
			.get('/api/orders/639c9996f9f13472eb6a0b48')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						dateCreated: expect.any(String),
						products: expect.any(Array)
					})
				)
			})
	})

	it('GET /api/orders/:id --> 404 if not found', () => {
		return request(app).get('/api/orders/000000000000000000000000').expect(404)
	})

	it('POST /api/orders --> created order', () => {
		return request(app)
			.post('/api/orders')
			.send({
				dateCompleted: new Date().toISOString(),
				products: ['6390f02ea007689bcc125b6e']
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						dateCreated: expect.any(String),
						dateCompleted: expect.any(String),
						products: expect.arrayContaining([
							expect.any(String)
						])
					})
				)
			})
	})
})
