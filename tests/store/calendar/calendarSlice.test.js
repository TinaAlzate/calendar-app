import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => { 

  test('Debe de regresar el estado inicial', () => {

    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( initialState );
  });

  test('onSetActiveEvent debe de activar el evento', () => {

    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
    expect( state.activeEvent ).toEqual( events[0] );
  });

  test('onSetActiveEvent debe de activar el evento', () => {

    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
    expect( state.activeEvent ).toEqual( events[0] );
  });

  test('onAddNewEvent debe de agregar el evento', () => {

    const newEvent = {
      id: '3',
      start: new Date('2022-12-26 13:00:00'),
      end: new Date('2022-12-26 15:00:00'),
      title: 'Cumpleaños del alguien',
      notes: 'Hay que comprar los globos',
    };

    const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
    expect( state.events ).toEqual( [ ...events, newEvent ] );
  });

  test('onUpdateEvent debe de actualizar el evento', () => {

    const updatedEvent = {
      id: '1',
      start: new Date('2020-12-26 13:00:00'),
      end: new Date('2020-12-26 15:00:00'),
      title: 'Cumpleaños del Javier actualizado',
      notes: 'Hay que comprar los globos',
    };

    const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
    expect( state.events ).toContain( updatedEvent );
  });

  test('onDeleteEvent debe de borrar el evento activo', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
    expect( state.activeEvent ).toBe( null );
    expect( state.events ).not.toContain( calendarWithActiveEventState );
  });

  test('onLoadEvent debe de establecer los eventos', () => {

    const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
    expect( state.isLoadingEvents ).toBeFalsy();
    expect( state.events).toEqual( events );
    
    const newState = calendarSlice.reducer( state, onLoadEvents(events));
    expect( state.events.length ).toBe( events.length );
  });

  test('onLogoutCalendar debe de limpiar el estado', () => {

    const state = calendarSlice.reducer( calendarWithEventsState, onLogoutCalendar() );
    expect( state ).toEqual( initialState );
  });
  
 })