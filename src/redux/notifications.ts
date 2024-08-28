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
    /**
     * Notification categories.
     * Initial states, the user will recieve notifications for truthy values.
     */
    initialState: {
        // Boolean for whether notifications has been allowed
        ALLOWED:            false,
        IMPORTANT:          false,
        TEKKOM:             false,
        CTF:                false,
        SOCIAL:             false,
        BEDPRES:            false,
        KARRIEREDAG:        false,
        FADDERUKA:          false,
        LOGIN:              false,
        ANNET:              false,
        
        // Category - (10m, 30m, 1h, 2h, 3h, 6h, 1d, 2d, 1w)
        tekkom:             [false],
        ctf:                [false],
        social:             [false],
        karrieredag:        [false],
        fadderuka:          [false],
        bedpres:            [false],
        login:              [false],
        annet:              [false]
    } as NotificationProps,

    // Declares slice reducer
    reducers: {
        // Change state of important notifications
        setNotificationStateTrue(state, action) {
            const category: NotificationCategory = action.payload.category
            state[category] = [true, true]
        },
        changeNotificationState(state, action) {
            const category: NotificationCategory = action.payload.category
            state[category] = [!state[category][0], true]
        },
        setNotificationDidUpdateOnFirebase(state, action) {
            const category: NotificationCategory = action.payload.category
            state[category] = [state[category][0], false]
        }
    }
})

// Exports the change function
export const { 
    setNotificationStateTrue, 
    changeNotificationState,
    setNotificationDidUpdateOnFirebase
} = NotificationSlice.actions

// Exports the notification slice
export default NotificationSlice.reducer
