import { baseURL, fetchWithOutBody }  from '../../src/api/calendarApi'

describe('Pruebas en el calendar API', () => {
  test('Debe tener la configuración', () => {
    // Aquí podriamos probar el fetch api
    expect( baseURL ).toBe( process.env.VITE_API_URL )
  });

  test('Debe de tener el x-token en el header de todas las peticiones', async() => {

  });
  
});
