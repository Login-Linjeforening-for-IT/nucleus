import { createSlice } from "@reduxjs/toolkit";                             // Imports slicer

export const NotificationSlice = createSlice({                              // Declares notification slice
    name: 'notification',                                                   // Slice name
    initialState: {                                                         // Initial state
        IMPORTANT:  1,                                                      // Important information
        REMINDERS:  1,                                                      // Reminders for enrolled events
        EVENTS:     0,                                                      // Notifications when any events are posted
        BEDPRES:    0,                                                      // Notifications when bedpres events are posted
        TEKKOM:     0,                                                      // Reminder 1 hour before tekkom starts
        CTF:        0,                                                      // Reminders for ctf
        SOCIAL:     0,                                                      // Reminders for social events like parties etc
    },
    reducers: {                                                             // Declares slice reducer
        changeNotificationState: (state, category) => {                     // Change state of important notifications
            state[category.payload] = !state[category.payload]              // Uses true false for 0 / 1
        },
    }
})

export const { changeNotificationState } = NotificationSlice.actions        // Exports the change function

export default NotificationSlice.reducer                                    // Exports the notification slice