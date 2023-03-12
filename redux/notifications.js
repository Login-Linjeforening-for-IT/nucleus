import { createSlice } from "@reduxjs/toolkit";                             // Imports slicer

export const NotificationSlice = createSlice({                              // Declares notification slice
    name: 'notification',                                                   // Slice name
    initialState: {                                                         // Initial state

        // Notification categories
        SETUP:              false,                                          // Initial notification setup when app is downloaded
        IMPORTANT:          true,                                           // Important information
        TEKKOM:             true,                                           // Notifications for new events of category TEKKOM
        CTF:                true,                                           // Notifications for new events of category CTF
        SOCIAL:             true,                                           // Notifications for new events of category SOCIAL
        BEDPRES:            true,                                           // Notifications for new events of category BEDPRES
        KARRIEREDAG:        true,                                           // Notifications for new events of category KARRIEREDAG
        FADDERUKA:          true,                                           // Notifications for new events of category FADDERUKA
        LOGIN:              true,                                           // Notifications for new events of category LOGIN
        ANNET:              true,                                           // Notifications for new events of category ANNET

        // Notification preferences - for automatic notifications

        // TekKom
        tekkom10m:          false,
        tekkom30m:          false,
        tekkom1h:           false,
        tekkom2h:           false,
        tekkom3h:           false,
        tekkom6h:           false,
        tekkom1d:           false,
        tekkom2d:           false,

        // Ctf
        ctf10m:             false,
        ctf30m:             false,
        ctf1h:              false,
        ctf2h:              false,
        ctf3h:              false,
        ctf6h:              false,
        ctf1d:              false,
        ctf2d:              false,
       
        // Social
        social10m:          false,
        social30m:          false,
        social1h:           false,
        social2h:           false,
        social3h:           false,
        social6h:           false,
        social1d:           false,
        social2d:           false,
        social1w:           false,

        // Karrieredag
        karrieredag10m:     false,
        karrieredag30m:     false,
        karrieredag1h:      false,
        karrieredag2h:      false,
        karrieredag3h:      false,
        karrieredag6h:      false,
        karrieredag1d:      false,
        karrieredag2d:      false,
        karrieredag1w:      false,

        // Fadderuka
        fadderuka10m:       false,
        fadderuka30m:       false,
        fadderuka1h:        false,
        fadderuka2h:        false,
        fadderuka3h:        false,
        fadderuka6h:        false,
        fadderuka1d:        false,
        fadderuka2d:        false,
        fadderuka1w:        false,

        // Bedpres
        bedpres10m:         false,
        bedpres30m:         false,
        bedpres1h:          false,
        bedpres2h:          false,
        bedpres3h:          false,
        bedpres6h:          false,
        bedpres1d:          false,
        bedpres2d:          false,
        bedpres1w:          false,

        // Login
        login10m:           false,
        login30m:           false,
        login1h:            false,
        login2h:            false,
        login3h:            false,
        login6h:            false,
        login1d:            false,
        login2d:            false,
        login1w:            false,

        // Annet
        annet10m:           false,
        annet30m:           false,
        annet1h:            false,
        annet2h:            false,
        annet3h:            false,
        annet6h:            false,
        annet1d:            false,
        annet2d:            false,
        annet1w:            true,
    },
    reducers: {                                                             // Declares slice reducer
        changeNotificationState: (state, category) => {                     // Change state of important notifications
            state[category.payload] = !state[category.payload]              // Uses true false for 0 / 1
        },
    }
})

export const { changeNotificationState } = NotificationSlice.actions        // Exports the change function

export default NotificationSlice.reducer                                    // Exports the notification slice