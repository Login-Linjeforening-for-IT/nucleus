import { createSlice } from "@reduxjs/toolkit"

type FilterProps = {
    input: string
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategories: string[]
}

type FilterTextProps = {
    events: EventProps[]
    input: string
}

type FilterCategoriesProps = {
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategories: string[]
}

type filterBothProps = {
    clickedCategories: string[]
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
        categories: {
            no: [] as string[],
            en: [] as string[],
        },
        clickedCategories: [] as string[],
        input: "",
        downloadState: new Date(),
        tag: ""
    },
    // Declares reducers
    reducers: {
        // Sets the event array
        setEvents(state, action) {
            state.events = action.payload
            state.renderedEvents = action.payload
            state.categories = setCategories(state.events, state.clickedEvents)
        },
        // Sets the event to be displayed on SES
        setEvent(state, action) {
            state.event = action.payload
        },
        // Sets the clicked events
        setClickedEvents(state, action) {
            state.clickedEvents = action.payload
            state.categories = setCategories(state.events, state.clickedEvents)
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
        },
        setDownloadState(state) {
            state.downloadState = new Date()
        },
        setTag(state, action) {
            state.tag = action.payload
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
    setDownloadState,
    setTag
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

    const categories = {
        no: [] as string[],
        en: [] as string[]
    }

    events.forEach(event => {
        if (!categories.no.includes(event.category_name_no)) categories.no.push(event.category_name_no)
        if (!categories.en.includes(event.category_name_en)) categories.en.push(event.category_name_en)
    })

    return categories
}

// --- PARENT FILTER FUNCTION ---
function Filter ({input, events, clickedEvents, clickedCategories}: FilterProps) {
    // Filters both on input and clicked categories if both are provided
    if (input.length && clickedCategories.length) {
        return filterBoth({clickedCategories, clickedEvents, events, input})
    // Filters on text if only text is provided
    } else if (input.length) {
        return filterText({events, input})
    // Filters on categories if only categories are provided
    } else if (clickedCategories.length) {
        return filterCategories({events, clickedEvents, clickedCategories})
    }

    // Returns events if there is nothing to be filtered
    return events
}

/**
 * Filters events based on if they include the passed text
 * @param events Events to filter 
 * @param input Text to filter based on
 * @returns Filtered events
 */
function filterText ({events, input}: FilterTextProps) {
    const textFiltered = events.filter(event => 
        event.name_no.toLowerCase().includes(input.toLowerCase()) 
        || event.name_en.toLowerCase().includes(input.toLowerCase())
    )

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
    // Checks if user is filtering by enrolled (PÅMELDT)
    const clickedFound = clickedCategories.find((category: string) => category === "Påmeldt")
    
    // Filters based on category
    const categoryFiltered = events.filter(event => 
        clickedCategories.some((category: string) => 
        category === event.category_name_no 
        || category === event.category_name_en
    ))

    // Returns if the user is not enrolled to any events
    if (!clickedFound) {
        return removeDuplicatesAndOld(events, categoryFiltered)
    }

    // Returns clickedEvents if the user has only clicked this
    if (clickedCategories.length < 2) {
        return removeDuplicatesAndOld(events, clickedEvents)
    }

    // Combines categoryFiltered and concatenatedArray and returns them without duplicates
    return removeDuplicatesAndOld(events, categoryFiltered.concat(clickedEvents))
}

/**
 * Filters events based on both category and text input
 * @param clickedCategories Categories clicked by the user
 * @param clickedEvents Events clicked by the user
 * @param events Events to filter
 * @param input
 * @returns Events filtered by both category and text
 */
function filterBoth ({clickedCategories, clickedEvents, events, input}: filterBothProps) {
    const categoryFiltered = filterCategories ({events, clickedEvents, clickedCategories})
    const textFiltered = filterText ({events: categoryFiltered, input})
    return removeDuplicatesAndOld(events, textFiltered)
}

/**
* Function for removing old events and duplicates
*
* @param APIevents Events from API
* @param events Events to filter
* @returns Filtered events
*/
export function removeDuplicatesAndOld (APIevents: EventProps[], events: 
    EventProps[]): EventProps[] {
    
    // Removes old events and preserves newer version of all events
    const realEvents = APIevents.filter(APIevent => 
        events.some(event => APIevent.id === event.id))

    // Removes duplicates
    const filteredEvents = realEvents.filter((event, index) => {
        return realEvents.findIndex(obj => obj.id === event.id) === index
    })

    return filteredEvents
}
