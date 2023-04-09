const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

describe('Ruta de Géneros', () => {
	describe('GET /genres', () => {
		it('Debería obtener el código 200', async () => {
			const res = await agent.get('/genres');
			expect(res.status).to.equal(200);
		});
		it('Debería retornar 19 géneros', async () => {
			const res = await agent.get('/genres');
			expect(res.body).to.have.lengthOf(19);
		});
	});
});