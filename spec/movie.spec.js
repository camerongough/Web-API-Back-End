var Request = require('request');

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
		it('Body', () => {
			expect(data.body.status).toBe('success');
		});
		it('Body', () => {
			expect(data.body.message).toBe('Retrieved All Movies');
		});
	});
});
