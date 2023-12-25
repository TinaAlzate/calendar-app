export const events = [
  {
    id: '1',
    start: new Date('2022-01-22 13:00:00'),
    end: new Date('2022-01-22 15:00:00'),
    title: 'Cumpleaños del Javier',
    notes: 'Hay que comprar el pastel',
  },
  {
    id: '2',
    start: new Date('2022-05-08 16:00:00'),
    end: new Date('2022-05-08 18:00:00'),
    title: 'Cumpleaños del Valentina',
    notes: 'Hay que comprar el regalo',
  }
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: null
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] }
}