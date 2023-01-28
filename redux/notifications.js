import { createSlice } from "@reduxjs/toolkit";                             // Imports slicer

export const NotificationSlice = createSlice({                              // Declares notification slice
    name: 'notification',                                                   // Slice name
    initialState: {                                                         // Initial state
        IMPORTANT:  true,                                                      // Important information
        REMINDERS:  true,                                                      // Reminders for enrolled events
        EVENTS:     true,                                                      // Notifications when any events are posted
        BEDPRES:    true,                                                      // Notifications when bedpres events are posted
        TEKKOM:     true,                                                      // Reminder 1 hour before tekkom starts
        CTF:        true,                                                      // Reminders for ctf
        SOCIAL:     true,                                                      // Reminders for social events like parties etc
    },
    reducers: {                                                             // Declares slice reducer
        changeNotificationState: (state, category) => {                     // Change state of important notifications
            state[category.payload] = !state[category.payload]              // Uses true false for 0 / 1
        },
    }
})

export const { changeNotificationState } = NotificationSlice.actions        // Exports the change function

export default NotificationSlice.reducer                                    // Exports the notification slice