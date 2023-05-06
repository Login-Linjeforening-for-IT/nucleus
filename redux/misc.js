import { createSlice } from "@reduxjs/toolkit";     // Imports slicer

export const MiscSlice = createSlice({              // Declares Misc Slice
    name: 'misc',                                   // Slice name
    initialState: {                                 // Initial state
        calendarID: null,                           // Null till the user makes a calendar
        oldUI: false                               // Allows the user to use the old user interface
    },
    reducers: {                                     // Declares slice reducer
        setCalendarID: (state, action) => {         // Function for setting the calendar ID
            state.calendarID = action.payload       // Sets the calendarID to the payload
        },
        setOldUI: (state, action) => {              // Function for enabling and disabling the old user interface
            state.oldUI = action.payload            // Sets the oldUI to the payload
        }
    }
})

export const { setCalendarID, setOldUI } = MiscSlice.actions  // Exports redurcers

export default MiscSlice.reducer                    // Exports the misc slice