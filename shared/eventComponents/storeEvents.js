import { removeDuplicatesAndOld } from "login/shared/eventComponents/fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompareDates from "login/shared/functions/compareDates";

/**
 * Stores firstcoming event and all clicked events
 * @param {*} events 
 * @param {*} clickedEvents 
 */
export default function storeEvents(events, clickedEvents) {
    if (clickedEvents.length > 0) {                                         // Checks if any events are clicked
        (async() => {                                                       // IIFE
            let storedID = 0;                                               // Variable that takes the ID of the stored event

            let unique = removeDuplicatesAndOld(events, clickedEvents);

            if(unique) {
                for (let i = 0; i < unique.length; i++) {                              // Finds the firstcoming event 
                    if (CompareDates((unique[i]).startt, (unique[storedID]).startt) == true) storedID = i;
                }
                
                await AsyncStorage.setItem("clickedEvents", JSON.stringify(unique))                                  // Stores clicked events
                if (unique[storedID]) await AsyncStorage.setItem("firstEvent", JSON.stringify((unique[storedID])))   // Stores firstcoming clicked events
            }
        })();
    };
}