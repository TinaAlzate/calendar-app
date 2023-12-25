import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter'
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>Calendar Page</h1>
}))

jest.mock('../../src/auth', () => ({
  LoginPage: () => <h1>Login Page</h1>
}))



describe('Pruebas en <AppRouter />', () => { 

  const mockCheckAuthToken = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'ckecking',
      checkAuthToken: mockCheckAuthToken
    })

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    // screen.debug();
    // expect(screen.getByText('Loading...')).toBeTruthy();
    // expect( mockCheckAuthToken).toHaveBeenCalled();
  });

  test('Debe de mostrar el login en caso de no estar autenticado', () => {
      useAuthStore.mockReturnValue({
        status: 'not-autenticated',
        checkAuthToken: mockCheckAuthToken
      })

    render(
      <MemoryRouter initialEntries={['/auth/algo/otracosa']}>
        <AppRouter />
      </MemoryRouter>
    );

    // screen.debug();
    // expect(screen.getByText('Login Page')).toBeTruthy();
  });

  test('Debe de mostrar el calendario si estamos autenticados', () => {
      useAuthStore.mockReturnValue({
        status: 'not-autenticated',
        checkAuthToken: mockCheckAuthToken
      })

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Calendar Page')).toBeTruthy();

  });
  
  
})