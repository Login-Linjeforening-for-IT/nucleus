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
    Platform,
} from "react-native"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setRenderedEvents } from "@redux/event"

type FilterProps = {
    input: string
    setRenderedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategory: CategoryWithID[]
}

type FilterTextProps = {
    events: EventProps[]
    setRenderedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
    input: string
}

type FilterCategoriesProps = {
    events: EventProps[]
    clickedEvents: EventProps[]
    clickedCategory: CategoryWithID[]
    setRenderedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
}

type filterBothProps = {
    clickedCategory: CategoryWithID[]
    clickedEvents: EventProps[]
    events: EventProps[]
    setRenderedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
    input: string
}

type FilterUIProps = {
    textInputRef: React.RefObject<TextInput>
    setClickedCategory: React.Dispatch<React.SetStateAction<CategoryWithID[]>>
    clickedCategory: CategoryWithID[]
    setInput: React.Dispatch<React.SetStateAction<string>>
}

// --- PARENT FILTER FUNCTION ---
export default function Filter({input, setRenderedEvents, events, clickedEvents, clickedCategory}: FilterProps) {
    // If the input is not empty
    if (input.length) {
        // If the user has clicked something
        if (clickedCategory.length > 0) {
            // Filter both text and categories if the text is longer than 0
            if (input.length > 0) {  filterBoth({clickedCategory, clickedEvents, events, setRenderedEvents, input})}
            else {setRenderedEvents([...events])}
            // Update the displayed events if the text is not longer than 0
        } else filterText({events, setRenderedEvents, input})
        // If no categories are clicked only filter text
    } else if (clickedCategory.length > 0) filterCategories({events, clickedEvents, clickedCategory, setRenderedEvents})
    // if the filter is null but categories are clicked only filter categories
    // If both are null or 0 update the displayed events
    else setRenderedEvents([...events])
}

// --- FILTERS TEXT ---
export function filterText ({events, setRenderedEvents, input}: FilterTextProps) {
    let textFiltered = events.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
    let uniqueFiltered = removeDuplicatesAndOld(events, textFiltered)
    // Converts to lowercase, filters and updates
    setRenderedEvents([...uniqueFiltered])
}

// --- FILTERS CATEGORIES ---
export function filterCategories ({events, clickedEvents, clickedCategory, setRenderedEvents}: FilterCategoriesProps) {
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
            setRenderedEvents([...uniqueFiltered])
        } else {
            // If only PÅMELDT is clicked only render the events in the clickedEvents array
            const categoryFiltered = clickedEvents.filter(event => clickedCategory.some((category: CategoryWithID) => event.category === event.category))
            let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered)

            // if there are no enrolled events filters and updates rendered array
            setRenderedEvents([...uniqueFiltered])
        }
    } else {
        // If the PÅMELDT category is not active
        const categoryFiltered = events.filter(event => clickedCategory.some((category: CategoryWithID) => category.category === event.category))
        let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered)

        // Filter categories normally and update the renderedEvents
        setRenderedEvents([...uniqueFiltered])
    }
}

// --- FILTERS CATEGORIES AND TEXT ---
export function filterBoth({clickedCategory, clickedEvents, events, setRenderedEvents, input}: filterBothProps) {
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
            // Updates renderedEvents
            setRenderedEvents([...uniqueFiltered])
            // If only PÅMELDT is clicked
        } else {
            // Filters text
            let filtered = clickedEvents.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
            let uniqueFiltered = removeDuplicatesAndOld(events, filtered)
            // Updates renderedEvents
            setRenderedEvents([...uniqueFiltered])
        }
    // If PÅMELDT is not clicked filter events normally
    } else {
        // Filters categories
        let filtered = events.filter(event => clickedCategory.some((category: CategoryWithID) => category.category === event.category))
        // Filters text
        filtered = filtered.filter(event => event.eventname.toLowerCase().includes(input.toLowerCase()))
        let uniqueFiltered = removeDuplicatesAndOld(events, filtered)
        // Updates the renderedEvents
        setRenderedEvents([...uniqueFiltered])
    }
}

/**
 * User interface for the filter
 *
 * @param textInputRef          Ref for text input
 * @param setRenderedEvents      Function to set the renderedEvents
 * @param setClickedCategory    Function to set the ClickedCategory
 * @param categories            Function to filter out relevant categories for the filter
 * @param clickedCategory       Array containing all clicked categories
 *
 * @returns Filter UI
 */
export function FilterUI({textInputRef, setClickedCategory, clickedCategory, setInput}: FilterUIProps): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { events, search, categories } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()

    return (
        <View style={search ? {top: Platform.OS === "ios" ? 40 : 30} : {display:'none'}}>
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
                    dispatch(setRenderedEvents([...events]))
                    setClickedCategory([])
                    if (textInputRef.current) textInputRef.current.clear()
                }}>
                    <Image style={ES.clusterFilterResetIcon} source={isDark ? require("@assets/icons/reset.png") : require("@assets/icons/reset-black.png")} />
                </TouchableOpacity>
            </View>

            <View style={ES.clusterFilterView}>
                <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    keyExtractor={(item) => `${item.id}`}
                    data={categories}
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
