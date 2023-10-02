import { removeDuplicatesAndOld } from "@/utils/fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CompareDates from "@/utils/compareDates"

type StoreEventsProps = {
    events: EventProps[]
    clickedEvents: EventProps[]
}

/**
 * Stores firstcoming event and all clicked events
 * @param {*} events
 * @param {*} clickedEvents
 */
export default function storeEvents({events, clickedEvents}: StoreEventsProps) {
    // Checks if any events are clicked
    if (clickedEvents.length > 0) {
        // IIFE
        (async() => {
            // Variable that takes the ID of the stored event
            let storedID = 0

            let unique = removeDuplicatesAndOld(events, clickedEvents)

            if (unique) {
                // Finds the firstcoming event
                for (let i = 0; i < unique.length; i++) {
                    if (CompareDates({firstDate: (unique[i]).startt, secondDate: (unique[storedID]).startt}) === true) storedID = i
                }

                // Stores clicked events
                await AsyncStorage.setItem("clickedEvents", JSON.stringify(unique))
                // Stores firstcoming clicked events
                if (unique[storedID]) await AsyncStorage.setItem("firstEvent", JSON.stringify((unique[storedID])))
            }
        })()
    }
}
