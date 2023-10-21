import { createSlice } from "@reduxjs/toolkit"

type FilterProps = {
    input: string
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategories: CategoryWithID[]
}

type FilterTextProps = {
    events: EventProps[]
    input: string
}

type FilterCategoriesProps = {
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategories: CategoryWithID[]
}

type filterBothProps = {
    clickedCategories: CategoryWithID[]
    clickedEvents: EventProps[]
    events: EventProps[]
    input: string
}

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
        clickedCategories: [] as CategoryWithID[],
        input: ""
    },
    // Declares reducers
    reducers: {
        // Sets the event array
        setEvents(state, action) {
            state.events = action.payload
            state.categories = setCategories(state.events, state.clickedEvents)
        },
        // Sets the event to be displayed on SES
        setEvent(state, action) {
            state.event = action.payload
        },
        // Sets the clicked events
        setClickedEvents(state, action) {
            state.clickedEvents = action.payload
            if (state.clickedEvents.length === 0) {
                state.categories = setCategories(state.events, state.clickedEvents)
            }
        },
        // Sets the events to be displayed
        setRenderedEvents(state, action) {
            state.renderedEvents = action.payload
        },
        // Stores the time of the most recent successful API call
        setLastFetch(state, action) {
            state.lastFetch = action.payload
        },
        // Stores the time of the most recent save to calendar
        setLastSave(state, action) {
            state.lastFetch = action.payload
        },
        // Toggles the filter visibility
        toggleSearch(state) {
            state.search = !state.search
        },
        // Sets the clicked categories inside of the filter
        setClickedCategories(state, action) {
            state.clickedCategories = action.payload
            state.renderedEvents = Filter({
                input: state.input,
                events: state.events, 
                clickedEvents: state.clickedEvents, 
                clickedCategories: state.clickedCategories
            })
        },
        // Resets states after searching
        reset(state) {
            state.input = ""
            state.renderedEvents = state.events
            state.clickedCategories = []
        },
        // Sets the search input
        setInput(state, action) {
            state.input = action.payload
            state.renderedEvents = Filter({
                input: state.input,
                events: state.events, 
                clickedEvents: state.clickedEvents, 
                clickedCategories: state.clickedCategories
            })
        }
    }
})

// Exports functions
export const { 
    reset,
    setClickedCategories,
    setClickedEvents,
    setEvents,
    setEvent,
    setInput,
    setLastFetch,
    setLastSave,
    setRenderedEvents,
    toggleSearch,
} = EventSlice.actions

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

// --- PARENT FILTER FUNCTION ---
function Filter({input, events, clickedEvents, clickedCategories}: FilterProps) {
    // If the input is not empty
    if (input.length) {
        // If the user has clicked something
        if (clickedCategories.length > 0) {
            // Filter both text and categories if the text is longer than 0
            if (input.length > 0) {
                return filterBoth({clickedCategories, clickedEvents, events, input})
            } else {
                return events
            }
            // Update the displayed events if the text is not longer than 0
        } else {
            return filterText({events, input})
        }
        // If no categories are clicked only filter text
    } else if (clickedCategories.length > 0) {
        return filterCategories({events, clickedEvents, clickedCategories})
    }
    // if the filter is null but categories are clicked only filter categories
    // If both are null or 0 update the displayed events
    return events
}

/**
 * Filters events based on if they include the passed text
 * @param events Events to filter 
 * @param input Text to filter based on
 * @returns Filtered events
 */
function filterText ({events, input}: FilterTextProps) {
    const textFiltered = events.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
    return removeDuplicatesAndOld(events, textFiltered)
}

/**
 * Filters events based on of their category is in the clickedCategories array
 * @param events Events to filter
 * @param clickedEvents Events clicked by the user
 * @param clickedCategories Categories clicked by the user
 * @returns Events filtered by category
 */
function filterCategories ({events, clickedEvents, clickedCategories}: FilterCategoriesProps) {
    // True or false if user is enrolled to some events
    const clickedFound = clickedCategories.find((object: CategoryWithID) => object.category === "PÅMELDT")
    // If the user is enrolled to events
    if (clickedFound) {
        // If the user has clicked at least 1 category
        if (clickedCategories.length > 1) {
            const categoryFiltered = events.filter(event => clickedCategories.some((category: CategoryWithID) => category.category === event.category))
            // Declares temporary array
            let concatenatedArray: EventProps[] = []

            // Goes through every clicked event
            clickedEvents.forEach(event => {
                // Checks for duplicates
                const duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID)
                // Removes duplicates
                if (!duplicateExists) {
                    concatenatedArray.push(event)
                }
            })

            // Combines categoryFiltered and concatenatedArray
            concatenatedArray = categoryFiltered.concat(concatenatedArray)
            return removeDuplicatesAndOld(events, concatenatedArray)
        } else {
            // If only PÅMELDT is clicked only render the events in the clickedEvents array
            const categoryFiltered = clickedEvents.filter(event => clickedCategories.some((category: CategoryWithID) => event.category === event.category))
            return removeDuplicatesAndOld(events, categoryFiltered)
        }
    } else {
        // If the PÅMELDT category is not active
        const categoryFiltered = events.filter(event => clickedCategories.some((category: CategoryWithID) => category.category === event.category))
        return removeDuplicatesAndOld(events, categoryFiltered)
    }
}

/**
 * Filters events based on both category and text input
 * @param clickedCategories Categories clicked by the user
 * @param clickedEvents Events clicked by the user
 * @param events Events to filter
 * @param input
 * @returns Events filtered by both category and text
 */
function filterBoth({clickedCategories, clickedEvents, events, input}: filterBothProps) {
    // If PÅMELDT is clicked
    const clickedFound = clickedCategories.find((item: CategoryWithID) => item.category === "PÅMELDT")

    // If PÅMELDT is not clicked filter events normally
    if (!clickedFound) {
        // Filters categories
        let filtered = events.filter(event => clickedCategories.some((category: CategoryWithID) => category.category === event.category))
        // Filters text
        filtered = filtered.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
        return removeDuplicatesAndOld(events, filtered)
    }

    // Filter text
    if (!clickedCategories.length) {
        const filtered = clickedEvents.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
        return removeDuplicatesAndOld(events, filtered)
    }

    // If at least one category is clicked filters based on category
    const categoryFiltered = events.filter(event => clickedCategories.some((category: CategoryWithID) => category.category === event.category))

    // Temporary array
    const concatenatedArray: EventProps[] = []

    // Goes through every clickedEvent
    clickedEvents.forEach(event => {
        // Checks for duplicates
        const duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID)
        // If no duplicate pushes to temporary array
        if (!duplicateExists) concatenatedArray.push(event)
    })

    // Concatinates clickedEvents and filtered events
    const newConcatenatedArray = categoryFiltered.concat(concatenatedArray)
    const filtered = newConcatenatedArray.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))

    return removeDuplicatesAndOld(events, filtered)
}

/**
* Function for removing old events and duplicates
*
* @param APIevents Events from API
* @param events Events to filter
* @returns Filtered events
*/
export function removeDuplicatesAndOld(APIevents: EventProps[], events: 
    EventProps[]): EventProps[] {
    
    // Removes old events and preserves newer version of all events
    const realEvents = APIevents.filter(APIevent => events.some(
        event => APIevent.eventID === event.eventID))

    // Removes duplicates
    const filteredEvents = realEvents.filter((event, index) => {
        return realEvents.findIndex(obj => obj.eventID === event.eventID) === index
    })

    return filteredEvents
}
