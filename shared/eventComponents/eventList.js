import notificationArray from 'login/shared/notificationComponents/notificationArray';
import EventCardLocation from 'login/shared/eventComponents/eventCardLocation';
import CategorySquare from 'login/shared/eventComponents/category';
import topic from 'login/shared/notificationComponents/topic';
import Space, { Month } from 'login/shared/components/utils';
import BellIcon from 'login/shared/eventComponents/bellIcon';
import Cluster from 'login/shared/functions/cluster';
import FetchColor from 'login/styles/fetchTheme';
import { ES } from 'login/styles/eventStyles';
import { T } from 'login/styles/text';
import React from 'react';               // React imports
import {                                 // React native components
    TouchableOpacity,                    // TouchableOpacity     (custom button)
    Dimensions,                          // Size of the device
    FlatList,                            // Flatlist component   (basic list)
    Text,                                // Text component
    View,                                // View component
} from 'react-native';                   // React native

export default function EventList ({ 
    navigation, 
    renderedArray, 
    clickedEvents, 
    search, 
    theme, 
    lang, 
    relevantCategories, 
    notification, 
    setClickedEvents, 
    lastSave,
    events,
    errorMessage
}) {
    if (renderedArray == null) return errorMessage("wifi", theme, lang)
    else if (renderedArray.length > 0) {
        return(
            <View>
                <FlatList
                    style={{minHeight: '100%'}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => item.eventID}
                    data={renderedArray}
                    renderItem={({item, index}) => (
                        <EventCard 
                            navigation={navigation}
                            renderedArray={renderedArray}
                            clickedEvents={clickedEvents}
                            search={search}
                            theme={theme}
                            lang={lang}
                            relevantCategories={relevantCategories}
                            notification={notification}
                            setClickedEvents={setClickedEvents}
                            lastSave={lastSave}
                            item={item}
                            index={index}
                        />
                    )}
                />
            </View>
        )
    } else {
        if (!events.length) errorMessage("wifi", theme, lang)
        else                errorMessage("nomatch", theme, lang)
    }
}

function EventCard ({ 
    navigation, 
    renderedArray, 
    clickedEvents, 
    search, 
    theme, 
    lang, 
    relevantCategories, 
    notification, 
    setClickedEvents, 
    lastSave,
    item,
    index
}) {
    const isOrange = clickedEvents.some(event => event.eventID === item.eventID) ? true : false

    return(
        <View> 
            <TouchableOpacity onPress={() => 
                    navigation.navigate('SpecificEventScreen', {item: item})
            }>
                {(index == 0 && search.status == 0) 
                    && Space(Dimensions.get('window').height/8.1)}
                <Cluster space={8}>
                    {index == 0 ? Space(8):null}
                    <View style={ES.eventBack}>
                        <FullCategorySquare item={item} theme={theme} lang={lang} />
                        <EventCardLocation item={item} theme={theme} lang={lang} />
                        <Bell 
                            item={item}
                            lang={lang}
                            notification={notification}
                            clickedEvents={clickedEvents}
                            isOrange={isOrange}
                            theme={theme}
                            setClickedEvents={setClickedEvents}
                        />
                    </View>
                </Cluster>
                <ListFooter 
                    index={index}
                    renderedArray={renderedArray}
                    search={search}
                    relevantCategories={relevantCategories}
                    lastSave={lastSave}
                    lang={lang}
                    theme={theme}
                />
            </TouchableOpacity>
        </View>
    )
}

export function ListFooter({index, renderedArray, search, relevantCategories, lastSave, lang, theme}) {
    return (
        <>
            {index == renderedArray.length-1 && <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Oppdatert kl:':'Updated:'} {lastSave}.</Text>}
            {index == renderedArray.length-1 && Space((Dimensions.get('window').height/3)+20)} 
            {index == renderedArray.length-1 && search.status == 1 ? Space(152.5):null}
            {index == renderedArray.length-1 && search.status == 1 ? Space(40*(Math.ceil(relevantCategories.length/3))):null}
        </>
    )
}

function FullCategorySquare({item,theme, lang}) {
    return (
        <View>
            <CategorySquare category={item.category} />

            <Text style={{
                ...ES.eventCardDayText, 
                color: FetchColor(theme, 'TEXTCOLOR')
            }}>{item.startt[8]}{item.startt[9]}</Text>

            <Month
                month={item.startt[5] + item.startt[6]}
                color={FetchColor(theme, 'TEXTCOLOR')}
                lang={lang}
            />
        </View>
    )
}

function Bell({item, lang, notification, clickedEvents, isOrange, theme, setClickedEvents}) {
    return (
        <View style={ES.view3}>
            <TouchableOpacity onPress={() => {
                topic(item.eventID, lang, 0, (item.category).toLowerCase(), 
                    notificationArray(notification, item.category))
                setClickedEvents(
                    clickedEvents.some(event => event.eventID === item.eventID) 
                    ? clickedEvents.filter((x) => x.eventID !== item.eventID)
                    : [...clickedEvents, item]
                )
            }}>
                <View style = {ES.bellPosition}>
                    <BellIcon orange={isOrange} theme={theme} />
                </View>
            </TouchableOpacity>
        </View>
    )
}