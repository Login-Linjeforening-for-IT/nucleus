import { createSlice } from "@reduxjs/toolkit"

// Declares Misc Slice
export const MiscSlice = createSlice({
    // Slice name
    name: "misc",
    // Initial state
    initialState: {
        // Empty till the user makes a calendar
        calendarID: "",
    },
    // Declares slice reducer
    reducers: {
        // Function for setting the calendar ID
        setCalendarID: (state, action) => {
            // Sets the calendarID to the payload
            state.calendarID = action.payload
        }
    }
})

// Exports redurcers
export const { setCalendarID } = MiscSlice.actions

// Exports the misc slice
export default MiscSlice.reducer
