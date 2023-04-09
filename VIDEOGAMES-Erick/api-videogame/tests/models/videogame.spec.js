const { Videogame, conn } = require('../../src/db.js');

describe('Modelo de Videogame', () => {
	before(() => {
		return conn.authenticate()
			.catch((err) => {
				console.error('No se pudo conectar con la base de datos:', err);
			});
	});

	beforeEach(() => {
		return Videogame.sync({ force: true });
	});

	describe('Validaciones', () => {
		it('debería lanzar un error si el nombre es nulo', (done) => {
			Videogame.create({})
				.then(() => done(new Error('Se requiere un nombre válido')))
				.catch(() => done());
		});

		it('debería lanzar un error si la descripción es nula', (done) => {
			Videogame.create({ name: 'Super Mario Bros' })
				.then(() => done(new Error('Se requiere una descripción')))
				.catch(() => done());
		});

		it('debería lanzar un error si las plataformas son nulas', (done) => {
			Videogame.create({ name: 'Super Mario Bros', description: "buen juego" })
				.then(() => done(new Error('Se requieren las plataformas')))
				.catch(() => done());
		});
	});
});
