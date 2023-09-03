import { createSlice } from "@reduxjs/toolkit";     // Imports slicer

export const MiscSlice = createSlice({              // Declares Misc Slice
    name: 'misc',                                   // Slice name
    initialState: {                                 // Initial state
        calendarID: null,                           // Null till the user makes a calendar
        remoteNavigate: {},                         // Object to use for the navigation from a push notification
        hasNavigated: false                         // Tracks if the user has navigated to the page
    },
    reducers: {                                     // Declares slice reducer
        setCalendarID: (state, action) => {         // Function for setting the calendar ID
            state.calendarID = action.payload       // Sets the calendarID to the payload
        },
        setRemoteNavigate: (state, action) => {     // Function for setting the remote object
            state.remoteNavigate = action.payload   // Sets the remoteNavigate object equal to the payload
        },
        setHasNavigated: (state, action) => {       // Function for setting the remote object
            state.remoteNavigate = action.payload   // Sets the remoteNavigate object equal to the payload
        }
    }
})

export const { setCalendarID, setRemoteNavigate, setHasNavigated } = MiscSlice.actions  // Exports redurcers

export default MiscSlice.reducer                    // Exports the misc slice