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
	describe('GET /api/v1/user/5a2a94d34c6cf823f99b38e8', () => {
		var data = {};
		beforeAll(done => {
			Request.get(
				'https://api.camerongough.co.uk/api/v1/user/5a2a94d34c6cf823f99b38e8',
				(error, response, body) => {
					data.status = response.statusCode;
					data.body = JSON.parse(body);
					done();
				}
			);
		});
		it('Status 403', () => {
			expect(data.status).toBe(403);
		});
		it('message: ', () => {
			expect(data.body.message).toBe('Not authorized');
		});
	});
	describe('GET /api/v1/user/cameron@camerongough.co.uk', () => {
		var data = {};
		beforeAll(done => {
			Request.get(
				'https://api.camerongough.co.uk/api/v1/user/cameron@camerongough.co.uk',
				(error, response, body) => {
					data.status = response.statusCode;
					data.body = JSON.parse(body);
					done();
				}
			);
		});
		it('Status 403', () => {
			expect(data.status).toBe(403);
		});
		it('message: ', () => {
			expect(data.body.message).toBe('Not authorized');
		});
	});
});
