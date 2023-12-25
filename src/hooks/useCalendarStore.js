import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import { fetchWithBody, fetchWithOutBody } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(store => store.calendar);
  const { user } = useSelector(store => store.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {

    try {

      if (calendarEvent.id) {
        await fetchWithBody(`/events/${calendarEvent.id}`, calendarEvent, 'PUT');
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      const data = await fetchWithBody('/events', calendarEvent, 'POST');
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));

    } catch (error) {
      Swal.fire('Error when saving', error.message, 'error')
    }
  }

  const startDeletingEvent = async () => {

    try {
      await fetchWithOutBody(`/events/${activeEvent.id}`, 'DELETE')
      dispatch(onDeleteEvent());
      return;

    } catch (error) {
      Swal.fire('Error when deleting', error.message, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {

      const data = await fetchWithOutBody('/events', 'GET');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));

    } catch (error) {
      Swal.fire('Error connection', error.message, 'error')
    }

  }

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent, // si es null devuelve false, sino devuelve true

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
