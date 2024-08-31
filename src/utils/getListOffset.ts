import { Dimensions, Platform } from "react-native"
import getHeight from "./getHeight"

type GetListOffsetProps = {
    search: boolean
    categories: string[]
    clickedEvents: EventProps[] | AdProps[]
    bottom?: boolean
    ad?: boolean
}

/**
 * Function for fetching the EventList top offset based on device height,
 * current state and content.
 * 
 * @param search Whether the user is currently searching
 * @param categories The categories that are currently selected
 * @param clickedEvents The events that have been clicked 
 * @param bottom Whether the offset is for the bottom of the list
 * @param ad Whether the list is for ads
 * 
 * @returns EventList top offset
 */
export default function getListOffset({search, categories: cat, clickedEvents, bottom, ad}: GetListOffsetProps): number {
    const windowHeight = Dimensions.get("window").height
    const contentOffset = (100 - getHeight(cat.length + clickedEvents.length))
    let baseOffset = Dimensions.get("window").height / 3

    if (search) {
        if (Platform.OS === "ios") {
            if (windowHeight < 700) {
                baseOffset = Dimensions.get("window").height / 3
            } else {
                baseOffset = Dimensions.get("window").height / 3.6
            }

            return baseOffset - contentOffset
        } else {
            if (windowHeight === 592) {
                baseOffset = Dimensions.get("window").height / (bottom ? 2.4 : 2.85)
            }

            if (windowHeight > 592 && windowHeight <= 700) {
                baseOffset = Dimensions.get("window").height / (bottom ? 2.7 : 3.2)
            }

            if (windowHeight > 700 && windowHeight <= 800) {
                baseOffset = Dimensions.get("window").height / (bottom ? 3 : 3.4)
            }

            if (windowHeight > 800 && windowHeight <= 900) {
                baseOffset = Dimensions.get("window").height / (bottom ? 3.91 : 3.3)
            }

            if (windowHeight === 936) {
                baseOffset = Dimensions.get("window").height / 4
            }

            return baseOffset - contentOffset
        }
    }
    
    if (Platform.OS === "ios") {
        return Dimensions.get("window").height / 8.2
    } else {
        if (windowHeight <= 592) {
            return Dimensions.get("window").height / (bottom ? 5 : 8)
        }

        if (windowHeight > 592 && windowHeight <= 700) {
            return Dimensions.get("window").height / (bottom ? 5.5 : 8)
        }

        if (windowHeight > 700 && windowHeight <= 800) {
            if (ad) {
                return Dimensions.get("window").height / (bottom ? 6.05 : 7.5)
            }

            return Dimensions.get("window").height / (bottom ? 6.05 : 8)
        }

        if (windowHeight > 800 && windowHeight <= 900) {
            if (ad) {
                return Dimensions.get("window").height / (bottom ? 10.5 : 6.5)
            }

            return Dimensions.get("window").height / (bottom ? 10.5 : 7)
        }

        if (windowHeight > 900) {
            return Dimensions.get("window").height / 9
        }

        return Dimensions.get("window").height / 7.8
    }
}