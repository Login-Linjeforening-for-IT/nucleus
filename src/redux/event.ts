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
        lastFetch: "",
        search: "",
        category: [] as CategoryWithID[]
    },
    // Declares reducers
    reducers: {
        // Function to set event array
        setEvents: (state, action) => {
            state.events = action.payload
        },
        setEvent: (state, action) => {
            state.event = action.payload
        },
        setClickedEvents: (state, action) => {
            state.clickedEvents = action.payload
        },
        setLastFetch: (state, action) => {
            state.lastFetch = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setClickedCategories: (state, action) => {
            state.search = action.payload
        },
    }
})

// Exports functions
export const { setEvents, setEvent, setClickedEvents, setLastFetch, setSearch, 
    setClickedCategories } = EventSlice.actions

// Exports the Event slice itself
export default EventSlice.reducer
