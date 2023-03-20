import { createSlice } from "@reduxjs/toolkit";     // Imports slicer

export const MiscSlice = createSlice({              // Declares Misc Slice
    name: 'misc',                                   // Slice name
    initialState: {                                 // Initial state
        calendarID: null                            // Null till the user makes a calendar
    },
    reducers: {                                     // Declares slice reducer
        setCalendarID: (state, action) => {         // Function for setting the calendar ID
            state.calendarID = action.payload       // Sets the calendarID to the payload
        }
    }
})

export const { setCalendarID } = MiscSlice.actions  // Exports the change function

export default MiscSlice.reducer                    // Exports the misc slice