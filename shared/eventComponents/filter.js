import { removeDuplicatesAndOld } from "./fetch";
import { ES } from "../../styles/eventStyles";
import FetchColor from "../../styles/fetchTheme";
import { CheckBox, CheckedBox, SmallCheck } from "./check";
import React from 'react';                                                  // React
import { T } from "../../styles/text";
import {                                                                    // React native components
    Text,                                                                   // Text component
    View,                                                                   // View component
    Image,                                                                  // Image component
    FlatList,                                                               // Flatlist component   (basic list)
    TextInput,                                                              // Text input component (allows the user to type)
    TouchableOpacity,                                                       // TouchableOpacity     (custom button)
} from 'react-native';                                                      // React native

export default function Filter (filter, setRenderedArray, events, clickedEvents, clickedCategory) {                                                  //  --- PARENT FILTER FUNCTION ---
    if (filter.input != null) {                                           // If filter.input is not null
        if (clickedCategory.length > 0){                                    // If the user has clicked something
            if (filter.input.length > 0){  filterBoth(clickedCategory, clickedEvents, events, setRenderedArray, filter)}                       // Filter both text and categories if the text is longer than 0
            else {setRenderedArray([...events])}                               // Update the displayed events if the text is not longer than 0
        } else filterText(events, setRenderedArray, filter)                                                      // If no categories are clicked only filter text
    } else if (clickedCategory.length > 0) filterCategories(events, clickedEvents, clickedCategory, setRenderedArray) // if the filter is null but categories are clicked only filter categories
    else setRenderedArray([...events])                                  // If both are null or 0 update the displayed events
}

export function filterText (events, setRenderedArray, filter) {                                              //  --- FILTERS TEXT ---
    let textFiltered = events.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
    let uniqueFiltered = removeDuplicatesAndOld(events, textFiltered);
    setRenderedArray([...uniqueFiltered]);                                  // Converts to lowercase, filters and updates
}

export function filterCategories (events, clickedEvents, clickedCategory, setRenderedArray) {                                        //  --- FILTERS CATEGORIES ---
    const clickedFound = clickedCategory.find(object => object.category === 'PÅMELDT'); // True or false if user is enrolled to some events 
    if (clickedFound) {                                                   // If the user is enrolled to events
        if (clickedCategory.length > 1){                                     // If the user has clicked at least 1 category
            let categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category));
            let concatenatedArray = [];                                       // Declares temporary array

            clickedEvents.forEach(event => {                                  // Goes through every clicked event
                let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID);  // Checks for duplicates
                if (!duplicateExists) { concatenatedArray.push(event) }         // Removes duplicates
            });

            concatenatedArray = categoryFiltered.concat(concatenatedArray);   // Combines categoryFiltered and concatenatedArray
            let uniqueFiltered = removeDuplicatesAndOld(events, concatenatedArray);

            setRenderedArray([...uniqueFiltered])                          // Updates renderedEvents to equal categories filtered
        } else {                                                              // If only PÅMELDT is clicked only render the events in the clickedEvents array
            const categoryFiltered = clickedEvents.filter(event => clickedCategory.some(category => event.category === event.category)); 
            let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered);

            setRenderedArray([...uniqueFiltered])                           // if there are no enrolled events filters and updates rendered array
        }
    } else {                                                                // If the PÅMELDT category is not active
        const categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category)); 
        let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered);

        setRenderedArray([...uniqueFiltered])                             // Filter categories normally and update the renderedArray
    }
}

export function filterBoth (clickedCategory, clickedEvents, events, setRenderedArray, filter) {                                              //  --- FILTERS CATEGORIES AND TEXT ---
    const clickedFound = clickedCategory.find(item => item.category === 'PÅMELDT'); // Checks if PÅMELDT is clicked                                     
    if (clickedFound) {                                                    // If PÅMELDT is clicked
        if (clickedCategory.length > 1){                                     // If at least one category is clicked filters based on category
            let categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category));
            let concatenatedArray = [];                                       // Temporary array
            clickedEvents.forEach(event => {                                  // Goes through every clickedEvent
            let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID); // Checks for duplicates
            if (!duplicateExists) { concatenatedArray.push(event) }         // If no duplicate pushes to temporary array
            });
            let newConcatenatedArray = categoryFiltered.concat(concatenatedArray);   // Concatinates clickedEvents and filtered events
            const filtered = newConcatenatedArray.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
            let uniqueFiltered = removeDuplicatesAndOld(events, filtered);
            setRenderedArray([...uniqueFiltered]);                            // Updates renderedArray
        } else {                                                              // If only PÅMELDT is clicked
            let filtered = clickedEvents.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));            // Filters text
            let uniqueFiltered = removeDuplicatesAndOld(events, filtered);
            setRenderedArray([...uniqueFiltered]);                            // Updates renderedArray
        }
    } else {                                                                  // If PÅMELDT is not clicked filter events normally
        let filtered = events.filter(event => clickedCategory.some(category => category.category === event.category));        // Filters categories
        filtered = filtered.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));              // Filters text
        let uniqueFiltered = removeDuplicatesAndOld(events, filtered);
        setRenderedArray([...uniqueFiltered]);                              // Updates renderedArray                                   // Updates the renderedArray
    }
}

/**
 * Fetches relevant categories to filter 
 * @param {*} setRelevantCategories 
 * @param {*} clickedEvents 
 * @param {*} events 
 * @param {*} category 
 */
export function fetchRelevantCategories (setRelevantCategories, clickedEvents, events, category) {
    if(clickedEvents.length > 0) {                                        // Adding enrolled option (PÅMELDT) filter option if > 0 enrolled events
        const relevantCategories = category.filter(category => events.some(events => events.category === category.category)); 
        relevantCategories.unshift({id: '1', category: 'PÅMELDT'})          // Filters then adds PÅMELDT since no event has this attribute
        setRelevantCategories([...relevantCategories])                      // Updates categories available to filter
    }else{                                                                // Sets filter options if there are no enrolled events
        const relevantCategories = category.filter(category => events.some(events => events.category === category.category)); 
        setRelevantCategories([...relevantCategories])                      // Updates categories available to filter
    }
}

export function filterInput (setFilter, val, filter) {                                          //  --- UPDATES FILTER TEXT INPUT ---
    setFilter({                                                         // Function to set filter
        ...filter,                                                      // Spread operator to spread filter
        input: val,                                                     // Change input to 'val'
    });
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
 * @returns {JSX.Element} Filter UI
 */
export function FilterUI ({textInputRef, setRenderedArray, setClickedCategory, relevantCategories, clickedCategory, theme, search}) {
    if (!search.status) return null
    else return (
        <View>
            <View style={ES.absoluteView}>
                <TextInput 
                    ref={textInputRef}
                    style={{...ES.clusterFilterText, backgroundColor: FetchColor(theme, 'DARKER')}}
                    maxLength={40}
                    placeholder='Søk..'
                    placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                    textAlign='center'
                    onChangeText={(val) => filterInput(val)}
                    selectionColor={FetchColor(theme, "ORANGE")}
                />
                <TouchableOpacity onPress={() => filterInput(null) + setRenderedArray([...events]) + setClickedCategory([]) + textInputRef.current.clear()}>
                        <Image style={ES.clusterFilterResetIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/icons/reset.png') : require('../../assets/icons/reset-black.png')} />
                </TouchableOpacity>
            </View>
            
            <View style={{...ES.clusterFilterView, backgroundColor: FetchColor(theme, 'DARKER')}}>
                <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                keyExtractor={(item) => item.id}
                data={relevantCategories}
                renderItem={({item}) => (
                    <View style={ES.clusterCategoryView}>
                        {clickedCategory.includes(item) ?
                            <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((x) => x.id !== item.id))}>
                                <View>
                                    <Text style={{...T.filterCategoryText, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.category}</Text>
                                    <View><CheckedBox/></View>
                                    <View><SmallCheck/></View>
                                </View>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                                <Text style={{...T.filterCategoryText, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.category}</Text>
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

export function toggleFilter (toggleSearch, search) {                                         //  --- SEARCH BAR VISIBILITY ---
    toggleSearch({
        ...search,
        status: !search.status
    });
}