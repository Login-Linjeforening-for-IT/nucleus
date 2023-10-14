import { createSlice } from "@reduxjs/toolkit"

type NotificationCategory =
    // Notification categories
    "SETUP" | "IMPORTANT" | "TEKKOM" | "CTF" | "SOCIAL" | "BEDPRES" |
    "KARRIEREDAG" | "FADDERUKA" | "LOGIN" | "ANNET" |

    // TekKom
    "tekkom10m" | "tekkom30m" | "tekkom1h" | "tekkom2h" | "tekkom3h" |
    "tekkom6h" | "tekkom1d" | "tekkom2d" |

    // CTF
    "ctf10m" | "ctf30m" | "ctf1h" | "ctf2h" | "ctf3h" | "ctf6h" |
    "ctf1d" | "ctf2d" |

    // Social
    "social10m" | "social30m" | "social1h" | "social2h" | "social3h" |
    "social6h" | "social1d" | "social2d" | "social1w" |

    // Karrieredag
    "karrieredag10m" | "karrieredag30m" | "karrieredag1h" | "karrieredag2h" |
    "karrieredag3h" | "karrieredag6h" | "karrieredag1d" | "karrieredag2d" |
    "karrieredag1w" |

    // Fadderuka
    "fadderuka10m" | "fadderuka30m" | "fadderuka1h" | "fadderuka2h" |
    "fadderuka3h" | "fadderuka6h" | "fadderuka1d" | "fadderuka2d" |
    "fadderuka1w" |

    // Bedpres
    "bedpres10m" | "bedpres30m" | "bedpres1h" | "bedpres2h" | "bedpres3h" |
    "bedpres6h" | "bedpres1d" | "bedpres2d" | "bedpres1w" |

    // Login
    "login10m" | "login30m" | "login1h" | "login2h" | "login3h" | "login6h" |
    "login1d" | "login2d" | "login1w" |

    // Annet
    "annet10m" | "annet30m" | "annet1h" | "annet2h" | "annet3h" | "annet6h" |
    "annet1d" | "annet2d" | "annet1w"


export const NotificationSlice = createSlice({
    // Slice name
    name: "notification",
    // Initial states, the user will recieve notifications for truthy values.
    initialState: {

        /**
         * Notification categories.
         */

        SETUP:             false,
        IMPORTANT:          true,
        TEKKOM:             true,
        CTF:                true,
        SOCIAL:             true,
        BEDPRES:            true,
        KARRIEREDAG:        true,
        FADDERUKA:          true,
        LOGIN:              true,
        ANNET:              true,

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
        annet1w:            false,
    },

    // Declares slice reducer
    reducers: {
        // Change state of important notifications
        setNotificationStateTrue(state, action) {
            const category: NotificationCategory = action.payload.category
            state[category] = true
        },
        changeNotificationState(state, action) {
            const category: NotificationCategory = action.payload.category
            state[category] = !state[category]
        },
    }
})

// Exports the change function
export const { 
    setNotificationStateTrue, 
    changeNotificationState 
} = NotificationSlice.actions

// Exports the notification slice
export default NotificationSlice.reducer
