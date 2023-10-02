import { CheckBox, CheckedBox, SmallCheck } from "@components/event/check"
import { removeDuplicatesAndOld } from "@/utils/fetch"
import FetchColor from "@styles/fetchTheme"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import React from "react"
import {
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    View,
    Text,
} from "react-native"

type FilterProps = {
    input: string
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategory: CategoryWithID[]
}

type FilterTextProps = {
    events: EventProps[]
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
    input: string
}

type FilterCategoriesProps = {
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategory: CategoryWithID[]
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
}

type filterBothProps = {
    clickedCategory: CategoryWithID[]
    clickedEvents: EventProps[]
    events: EventProps[]
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
    input: string
}

type fetchRelevantCategoriesProps = {
    setRelevantCategories: React.Dispatch<React.SetStateAction<CategoryWithID[]>>
    clickedEvents: EventProps[]
    events: EventProps[]
    category: CategoryWithID[]
}

type FilterUIProps = {
    textInputRef: React.RefObject<TextInput>
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
    setClickedCategory: React.Dispatch<React.SetStateAction<CategoryWithID[]>>
    relevantCategories: CategoryWithID[]
    clickedCategory: CategoryWithID[]
    search: boolean
    setInput: React.Dispatch<React.SetStateAction<string>>
    items: EventProps[]
    theme: number
}

// --- PARENT FILTER FUNCTION ---
export default function Filter({input, setRenderedArray, events, clickedEvents, clickedCategory}: FilterProps) {
    // If the input is not empty
    if (input.length) {
        // If the user has clicked something
        if (clickedCategory.length > 0) {
            // Filter both text and categories if the text is longer than 0
            if (input.length > 0) {  filterBoth({clickedCategory, clickedEvents, events, setRenderedArray, input})}
            else {setRenderedArray([...events])}
            // Update the displayed events if the text is not longer than 0
        } else filterText({events, setRenderedArray, input})
        // If no categories are clicked only filter text
    } else if (clickedCategory.length > 0) filterCategories({events, clickedEvents, clickedCategory, setRenderedArray})
    // if the filter is null but categories are clicked only filter categories
    // If both are null or 0 update the displayed events
    else setRenderedArray([...events])
}

// --- FILTERS TEXT ---
export function filterText ({events, setRenderedArray, input}: FilterTextProps) {
    let textFiltered = events.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
    let uniqueFiltered = removeDuplicatesAndOld(events, textFiltered)
    // Converts to lowercase, filters and updates
    setRenderedArray([...uniqueFiltered])
}

// --- FILTERS CATEGORIES ---
export function filterCategories ({events, clickedEvents, clickedCategory, setRenderedArray}: FilterCategoriesProps) {
    // True or false if user is enrolled to some events
    const clickedFound = clickedCategory.find((object: CategoryWithID) => object.category === "PÅMELDT")
    // If the user is enrolled to events
    if (clickedFound) {
        // If the user has clicked at least 1 category
        if (clickedCategory.length > 1) {
            let categoryFiltered = events.filter(event => clickedCategory.some((category: CategoryWithID) => category.category === event.category))
            // Declares temporary array
            let concatenatedArray: EventProps[] = []

            // Goes through every clicked event
            clickedEvents.forEach(event => {
                // Checks for duplicates
                let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID)
                // Removes duplicates
                if (!duplicateExists) { concatenatedArray.push(event) }
            })

            // Combines categoryFiltered and concatenatedArray
            concatenatedArray = categoryFiltered.concat(concatenatedArray)
            let uniqueFiltered = removeDuplicatesAndOld(events, concatenatedArray)

            // Updates renderedEvents to equal categories filtered
            setRenderedArray([...uniqueFiltered])
        } else {
            // If only PÅMELDT is clicked only render the events in the clickedEvents array
            const categoryFiltered = clickedEvents.filter(event => clickedCategory.some((category: CategoryWithID) => event.category === event.category))
            let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered)

            // if there are no enrolled events filters and updates rendered array
            setRenderedArray([...uniqueFiltered])
        }
    } else {
        // If the PÅMELDT category is not active
        const categoryFiltered = events.filter(event => clickedCategory.some((category: CategoryWithID) => category.category === event.category))
        let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered)

        // Filter categories normally and update the renderedArray
        setRenderedArray([...uniqueFiltered])
    }
}

// --- FILTERS CATEGORIES AND TEXT ---
export function filterBoth({clickedCategory, clickedEvents, events, setRenderedArray, input}: filterBothProps) {
    // If PÅMELDT is clicked
    const clickedFound = clickedCategory.find((item: CategoryWithID) => item.category === "PÅMELDT")
    if (clickedFound) {
        // If at least one category is clicked filters based on category
        if (clickedCategory.length > 1) {
            let categoryFiltered = events.filter(event => clickedCategory.some((category: CategoryWithID) => category.category === event.category))
            // Temporary array
            let concatenatedArray: EventProps[] = []
            // Goes through every clickedEvent
            clickedEvents.forEach(event => {
                // Checks for duplicates
                let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID)
                // If no duplicate pushes to temporary array
                if (!duplicateExists) concatenatedArray.push(event)
            })
            // Concatinates clickedEvents and filtered events
            let newConcatenatedArray = categoryFiltered.concat(concatenatedArray)
            const filtered = newConcatenatedArray.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
            let uniqueFiltered = removeDuplicatesAndOld(events, filtered)
            // Updates renderedArray
            setRenderedArray([...uniqueFiltered])
            // If only PÅMELDT is clicked
        } else {
            // Filters text
            let filtered = clickedEvents.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
            let uniqueFiltered = removeDuplicatesAndOld(events, filtered)
            // Updates renderedArray
            setRenderedArray([...uniqueFiltered])
        }
    // If PÅMELDT is not clicked filter events normally
    } else {
        // Filters categories
        let filtered = events.filter(event => clickedCategory.some((category: CategoryWithID) => category.category === event.category))
        // Filters text
        filtered = filtered.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
        let uniqueFiltered = removeDuplicatesAndOld(events, filtered)
        // Updates the renderedArray
        setRenderedArray([...uniqueFiltered])
    }
}

/**
 * Fetches relevant categories to filter
 * @param {*} setRelevantCategories
 * @param {*} clickedEvents
 * @param {*} events
 * @param {*} category
 */
export function fetchRelevantCategories({setRelevantCategories, clickedEvents, events, category}: fetchRelevantCategoriesProps) {
    // Adding enrolled option (PÅMELDT) filter option if > 0 enrolled events
    if (clickedEvents.length > 0) {
        const relevantCategories = category.filter((category: CategoryWithID) => events.some(events => events.category === category.category))
        // Filters then adds PÅMELDT since no event has this attribute
        relevantCategories.unshift({id: 1, category: "PÅMELDT"})
        // Updates categories available to filter
        setRelevantCategories([...relevantCategories])
        // Sets filter options if there are no enrolled events
    } else {
        const relevantCategories = category.filter((category: CategoryWithID) => events.some(events => events.category === category.category))
         // Updates categories available to filter
        setRelevantCategories([...relevantCategories])
    }
}

/**
 * User interface for the filter
 *
 * @param {*} textInputRef          Ref for text input
 * @param {*} setRenderedArray      Function to set the RenderedArray
 * @param {*} setClickedCategory    Function to set the ClickedCategory
 * @param {*} relevantCategories    Function to filter out relevant categories for the filter
 * @param {*} clickedCategory       Array containing all clicked categories
 *
 * @returns Filter UI
 */
export function FilterUI({textInputRef, setRenderedArray, setClickedCategory,
relevantCategories, clickedCategory, search, setInput, items, theme}: FilterUIProps): JSX.Element {

    return (
        <View style={search?{backgroundColor: FetchColor({theme, variable: "DARKER"})}:{display:'none'}}>
            <View style={ES.absoluteView}>
                <TextInput
                    ref={textInputRef}
                    style={{...ES.clusterFilterText}}
                    maxLength={40}
                    placeholder="Søk.."
                    placeholderTextColor={FetchColor({theme, variable: "TITLETEXTCOLOR"})}
                    textAlign="center"
                    onChangeText={(val) => setInput(val)}
                    selectionColor={FetchColor({theme, variable: "ORANGE"})}
                />
                <TouchableOpacity
                onPress={() => {
                    setInput("")
                    setRenderedArray([...items])
                    setClickedCategory([])
                    if (textInputRef.current) textInputRef.current.clear()
                }}>
                    <Image style={ES.clusterFilterResetIcon} source={theme === 0 || theme === 2 || theme === 3 ? require("@assets/icons/reset.png") : require("@assets/icons/reset-black.png")} />
                </TouchableOpacity>
            </View>

            <View style={{...ES.clusterFilterView, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
                <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    keyExtractor={(item) => `${item.id}`}
                    data={relevantCategories}
                    renderItem={({item}) => (
                    <View style={ES.clusterCategoryView}>
                        {clickedCategory.includes(item) ?
                            <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((category: CategoryWithID) => category.id !== item.id))}>
                                <View>
                                    <Text style={{...T.filterCategoryText, color: FetchColor({theme, variable: "TITLETEXTCOLOR"})}}>{item.category}</Text>
                                    <View><CheckedBox/></View>
                                    <View><SmallCheck/></View>
                                </View>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                                <Text style={{...T.filterCategoryText, color: FetchColor({theme, variable: "TITLETEXTCOLOR"})}}>{item.category}</Text>
                                <CheckBox/>
                            </TouchableOpacity>
                        }
                    </View>
                )}
                />
            </View>
        </View>
    )
}
