import { createSlice } from "@reduxjs/toolkit"

// Declares the event slice
export const EventSlice = createSlice({
    // Names the slice as "event"
    name: "event",
    // Initial state of the slice
    initialState: {
        events: [] as EventProps[],
        event: {} as EventProps,
        clickedEvents: [] as EventProps[],
        renderedEvents: [] as EventProps[],
        lastFetch: "",
        lastSave: "",
        search: false,
        categories: [] as CategoryWithID[],
        category: [] as CategoryWithID[]
    },
    // Declares reducers
    reducers: {
        // Function to set event array
        setEvents(state, action) {
            state.events = action.payload
            state.categories = setCategories(state.events, state.clickedEvents)
        },
        setEvent(state, action) {
            state.event = action.payload
        },
        setClickedEvents(state, action) {
            state.clickedEvents = action.payload
            if (state.clickedEvents.length === 0) {
                state.categories = setCategories(state.events, state.clickedEvents)
            }
        },
        setRenderedEvents(state, action) {
            state.renderedEvents = action.payload
        },
        setLastFetch(state, action) {
            state.lastFetch = action.payload
        },
        setLastSave(state, action) {
            state.lastFetch = action.payload
        },
        toggleSearch(state) {
            state.search = !state.search
        },
        setClickedCategories(state, action) {
            state.search = action.payload
        },
    }
})

// Exports functions
export const { setEvents, setEvent, setClickedEvents, setLastFetch, setLastSave,
    setRenderedEvents, toggleSearch, setClickedCategories } = EventSlice.actions

// Exports the Event slice itself
export default EventSlice.reducer

/**
 * Updates relevant categories to filter
 * @param clickedEvents
 * @param events
 */
function setCategories(events: EventProps[], clickedEvents: EventProps[]) {
    // All categories to filter - DO NOT CHANGE IDS
    const catArray = [
        {id: 2, category: "TEKKOM"},
        {id: 3, category: "SOCIAL"},
        {id: 4, category: "CTF"},
        {id: 5, category: "KARRIEREDAG"},
        {id: 6, category: "FADDERUKA"},
        {id: 7, category: "BEDPRES"},
        {id: 8, category: "LOGIN"},
        {id: 9, category: "ANNET"}
    ]

    const categories = catArray.filter((category: CategoryWithID) =>
        events.some(events => events.category === category.category))

    // Adds enrolled (PÅMELDT) filter option if relevant, since no event has this attribute naturally
    if (clickedEvents.length > 0) {
        categories.unshift({id: 1, category: "PÅMELDT"})
    }

    return categories
}
