const request = require('supertest');
const app = require('../app'); // Importa tu aplicación Express

describe('Test para routerCountries', () => {
  it('debería obtener un país por ID', async () => {
    const res = await request(app).get('/countries/ARG');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('debería devolver un error 404 si el país no se encuentra', async () => {
    const res = await request(app).get('/countries/XYZ');
    expect(res.statusCode).toEqual(404);
  });

  it('debería manejar errores internos del servidor', async () => {
    const res = await request(app).get('/countries/%%%');
    expect(res.statusCode).toEqual(500);
  });
});