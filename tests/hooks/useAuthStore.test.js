import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { testUserCredentials } from "../fixtures/testUser";
import { baseURL, fetchWithBody } from "../../src/api";

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}

describe('Pruebas en useAuthStore', () => {

  beforeEach(() => localStorage.clear() );

  test('debe de regresar los valores por defecto', () => {
    
    const mockStore = getMockStore( initialState );

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    })
  });

  test('startLogin debe de realizar el login correctamente', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });
    
    await act( async() => {
      await result.current.startLogin( testUserCredentials )
    })

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { 
        name: 'Test user',
        uid: '6589afe5f6b56b38339fa2cd' 
      },
    });

    expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
    expect( localStorage.getItem( 'token-init-date' ) ).toEqual( expect.any( String ) );
  });

  test('startLogin debe de fallar la autenticación si las credenciales son incorrectas', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    await act(async () => {
      await result.current.startLogin({ email: 'algo@google.com', password: '123457' })
    });

    const { errorMessage, status, user } = result.current;
    
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: 'not-authenticated',
      user: {}
    });
    expect(localStorage.getItem('token')).toBe(null);

    await waitFor( 
      () => expect( result.current.errorMessage ).toBe( undefined )
    )
  });

  // test('startRegister debe de registrar un usuario', async() => {
    
  //   const newUser = { email: 'test2@gmail.com', password: '123456', name: 'Test user 2' }

  //   const mockStore = getMockStore({ ...notAuthenticatedState });

  //   const { result } = renderHook(() => useAuthStore(), {
  //     wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
  //   });

  //   // const spy = jest.spyOn( baseURL, 'post' ).mockReturnValue({

  //   //     ok: true,
  //   //     uid: '123456789',
  //   //     name: 'NAME-USER',
  //   //     token: 'ALGUN-TOKEN'

  //   // })

  //   await act(async () => {
  //     await result.current.startRegister( newUser );
  //   });

  //   const { errorMessage, status, user } = result.current;
  //   expect({ errorMessage, status, user }).toEqual({
  //     errorMessage: undefined,
  //     status: 'authenticated',
  //     user: { name: 'Test user 2', uid: expect.any( String) }
  //   });

  //   // spy.mockRestore()
  // });
  
  test('startRegister debe de fallar la creación', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    await act(async () => {
      await result.current.startRegister( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: 'not-authenticated',
      user: {}
    });
  });

  test('checkAuthToken debe de fallar si no hay token', async() => {
    
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    });
  });

  test('checkAuthToken debe de autenticar al usuario si hay token', async () => {

    const data = await fetchWithBody('/auth', testUserCredentials, 'POST');

    localStorage.setItem( 'token', data.token );

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { 
        name: 'Test user', 
        uid: '6589afe5f6b56b38339fa2cd' 
      }
    });
  });

})