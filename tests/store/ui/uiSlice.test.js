import {onCloseDateModal, onOpenDateModal, uiSlice} from '../../../src/store/ui/uiSlice'

describe('Pruebas en uiSlice', () => {

  test('Debe de regresar el estado por defecto', () => {
    expect( uiSlice.getInitialState().isDateModalOpen ).toBeFalsy();
  });

  test('debe de cambiar el valor de isDateModalOpen correctamente', () => {
    
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer( state, onOpenDateModal() );
    expect( state.isDateModalOpen ).toBeTruthy();

    state = uiSlice.reducer( state, onCloseDateModal() );
    expect( state.isDateModalOpen ).toBeFalsy();
  });
});
