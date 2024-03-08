describe('Test para routerActivities POST', () => {
    it('debería crear una actividad si todos los datos son proporcionados', async () => {
      const res = await request(app)
        .post('/activities')
        .send({
          name: 'ACTIVITY',
          difficulty: '5',
          duration: '1',
          season: 'Summer',
          countries: 'ARG,USA'
        });
      expect(res.statusCode).toEqual(201);
    });
  
    it('debería devolver un error 400 si faltan datos', async () => {
      const res = await request(app)
        .post('/activities')
        .send({
          name: 'ACTIVITY',
          difficulty: '5',
          duration: '1',
          season: 'Summer'
          // countries missing
        });
      expect(res.statusCode).toEqual(400);
    });
  
    it('debería devolver un error 404 si los países no existen', async () => {
      const res = await request(app)
        .post('/activities')
        .send({
          name: 'ACTIVITY',
          difficulty: '5',
          duration: '1',
          season: 'Summer',
          countries: 'XYZ' // This country does not exist
        });
      expect(res.statusCode).toEqual(404);
    });
  
    it('debería devolver un error 409 si el nombre de la actividad ya existe', async () => {
      const res = await request(app)
        .post('/activities')
        .send({
          name: 'EXISTING_ACTIVITY', // This activity already exists
          difficulty: '5',
          duration: '1',
          season: 'Summer',
          countries: 'ARG,USA'
        });
      expect(res.statusCode).toEqual(409);
    });
  
    it('debería manejar errores internos del servidor', async () => {
      const res = await request(app)
        .post('/activities')
        .send({
          name: '%%%INVALID_ACTIVITY%%%', // This will cause a server error
          difficulty: '5',
          duration: '1',
          season: 'Summer',
          countries: 'ARG,USA'
        });
      expect(res.statusCode).toEqual(500);
    });
  });
  