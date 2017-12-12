var Request = require('request');
/*eslint-disable*/
describe('Server', () => {
	var server;
	beforeAll(() => {
		server = require('../server');
	});
	afterAll(() => {
		server.close();
	});
	describe('GET /api/v1/movies', () => {
		var data = {};
		beforeAll(done => {
			Request.get(
				'https://api.camerongough.co.uk/api/v1/movies',
				(error, response, body) => {
					data.status = response.statusCode;
					data.body = JSON.parse(body);
					done();
				}
			);
		});
		it('Status 200', () => {
			expect(data.status).toBe(200);
		});
		it('status: success ', () => {
			expect(data.body.status).toBe('success');
		});
		it('message: ', () => {
			expect(data.body.message).toBe('Retrieved All Movies');
		});
	});
	describe('GET /api/v1/movies/5a01d2a1a2b1e109afcb8b95)', () => {
		var data = {};
		beforeAll(done => {
			Request.get(
				'https://api.camerongough.co.uk/api/v1/movies/5a01d2a1a2b1e109afcb8b95',
				(error, response, body) => {
					data.status = response.statusCode;
					data.body = JSON.parse(body);
					done();
				}
			);
		});
		it('Status 200', () => {
			expect(data.status).toBe(200);
		});
		it('Body', () => {
			expect(data.body.status).toBe('success');
		});
		it('Body', () => {
			expect(data.body.message).toBe('Retrieved movie');
		});
	});
	describe('GET /api/v1/movies/search?movie=blade+runner)', () => {
		var data = {};
		beforeAll(done => {
			Request.get(
				'https://api.camerongough.co.uk/api/v1/movies/search?movie=blade+runner',
				(error, response, body) => {
					data.status = response.statusCode;
					data.body = JSON.parse(body);
					done();
				}
			);
		});
		it('Status 200', () => {
			expect(data.status).toBe(200);
		});
		it('Body', () => {
			expect(data.body.status).toBe('success');
		});
		it('Body', () => {
			expect(data.body.message).toBe('Searched for movie title');
		});
	});
	describe('GET /api/v1/movies/search?movie=blade+runner)', () => {
		var data = {};
		beforeAll(done => {
			Request.get(
				'https://api.camerongough.co.uk/api/v1/movies/search?movie=gfgfhgf',
				(error, response, body) => {
					data.status = response.statusCode;
					data.body = JSON.parse(body);
					done();
				}
			);
		});
		it('Status 200', () => {
			expect(data.status).toBe(200);
		});
		it('Body', () => {
			expect(data.body.status).toBe('failed');
		});
		it('Body', () => {
			expect(data.body.message).toBe('Movie title not found');
		});
	});
});
