import { createSlice } from "@reduxjs/toolkit"

// Declares Notification List Slice
export const NotificationListSlice = createSlice({
    // Slice name
    name: "notificationList",
    // Initial state
    initialState: {
        // true is Norwegian, false is English
        list: []
    },
    // Declares slice reducer
    reducers: {
        // Function to change language
        setList: (state, action) => {
            state.list = action.payload.list
        },
    }
})

// Exports the change function
export const { setList } = NotificationListSlice.actions

// Exports the language slice
export default NotificationListSlice.reducer