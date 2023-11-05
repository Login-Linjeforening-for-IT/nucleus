import ES from "@styles/eventStyles"
import MS from "@styles/menuStyles"
import React, { useRef } from "react"
import T from "@styles/text"
import { CheckBox, CheckedBox, SmallCheck } from "@components/event/check"
import { reset as resetEvents, setClickedCategories, setInput, toggleSearch as eventToggleSearch } from "@redux/event"
import { reset as resetAds } from "@redux/ad"
import { toggleSearch as adToggleSearch } from "@redux/ad"
import { setClickedSkills } from "@redux/ad"
import { useSelector, useDispatch } from "react-redux"
import {
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    View,
    Text,
    Platform,
    Dimensions,
} from "react-native"
import { useRoute } from "@react-navigation/native"

/**
 * User interface for the filter
 * @returns Filter UI
 */
export function FilterUI(): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const event = useSelector((state: ReduxState) => state.event)
    const ad = useSelector((state: ReduxState) => state.ad)
    const resetIcon = isDark 
        ? require("@assets/icons/reset.png") 
        : require("@assets/icons/reset-black.png")
    const dispatch = useDispatch()
    const textInputRef = useRef<TextInput | null>(null)
    const route = useRoute()
    const isSearchingEvents = route.name === "EventScreen" && event.search
    const isSearchingAds = route.name === "AdScreen" && ad.search
    const isSearching = isSearchingEvents || isSearchingAds
    const top = Platform.OS === "ios" 
        ? ad.skills.length * 1.5
        : ad.skills.length * 1.35

        return (
        <View style={isSearching ? {top: top} : { display: 'none' }}>
            <View style={ES.absoluteView}>
                <TextInput
                    ref={textInputRef}
                    style={{...ES.clusterFilterText}}
                    maxLength={40}
                    placeholder={lang ? "Søk.." : "Search.."}
                    placeholderTextColor={theme.titleTextColor}
                    textAlign="center"
                    onChangeText={(val) => dispatch(setInput(val))}
                    selectionColor={theme.orange}
                />
                <TouchableOpacity onPress={() => {
                    isSearchingEvents && dispatch(resetEvents())
                    isSearchingAds && dispatch(resetAds())
                    if (textInputRef.current) textInputRef.current.clear()
                }}>
                    <Image style={ES.clusterFilterResetIcon} source={resetIcon} />
                </TouchableOpacity>
            </View>
            <FilterCategoriesOrSkills />
        </View>
    )
}

/**
 * Displays the filter button
 * @returns Filter button
 */
export function FilterButton(){
    const { isDark } = useSelector((state: ReduxState) => state.theme)
    const event = useSelector((state: ReduxState) => state.event)
    const ad = useSelector((state: ReduxState) => state.ad)
    const dispatch = useDispatch()
    const route = useRoute()
    const isSearching = route.name === "EventScreen" && event.search || route.name === "AdScreen" && ad.search

    function handlePress() {
        route.name === "EventScreen" && dispatch(eventToggleSearch())
        route.name === "AdScreen" && dispatch(adToggleSearch())
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            {isSearching
                ? <Image 
                    style={MS.multiIcon} 
                    source={require("@assets/icons/filter-orange.png")}
                />
                : <Image 
                    style={MS.multiIcon} 
                    source={isDark
                        ? require("@assets/icons/filter.png") 
                        : require("@assets/icons/filter-black.png")
                    }
                />
            }
        </TouchableOpacity>
    )
}

/**
 * Displays the filter checkboxes for categories or skills
 * @returns 
 */
function FilterCategoriesOrSkills() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const event = useSelector((state: ReduxState) => state.event)
    const ad = useSelector((state: ReduxState) => state.ad)
    const dispatch = useDispatch()
    const route = useRoute()
    const categories = event.categories
    const skills = ad.skills.map((skill, index) => ({ id: index, category: skill }))
    const isFilteringOnEventScreen = event.search && route.name === "EventScreen"
    const item = isFilteringOnEventScreen ? categories : skills

    function handleUnchecked(item: CategoryWithID) {
        if (isFilteringOnEventScreen) {
            dispatch(setClickedCategories(event.clickedCategories.filter((category: CategoryWithID) => category.id !== item.id)))
        } else {
            dispatch(setClickedSkills(ad.clickedSkills.filter((skill: string) => skill !== item.category)))
        }
    }

    function handleChecked(item: CategoryWithID) {
        if (isFilteringOnEventScreen) {
            dispatch(setClickedCategories([...event.clickedCategories, item]))
        } else {
            dispatch(setClickedSkills([...ad.clickedSkills, item.category]))
        }
    }

    return (
        <View style={ES.clusterFilterView}>
            <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                keyExtractor={(item) => `${item.id}`}
                data={item}
                renderItem={({item}) => (
                    <View style={ES.clusterCategoryView}>
                    {event.search && event.clickedCategories.includes(item) ||
                     ad.search && ad.clickedSkills.includes(item.category) ?
                        <TouchableOpacity onPress={() => handleUnchecked(item)}>
                            <View style={{width: Dimensions.get("window").width / 4.2}}>
                                <Text style={{
                                    ...T.filterCategoryText,
                                    color: theme.titleTextColor
                                }}>
                                    {item.category}
                                </Text>
                                <View><CheckedBox /></View>
                                <View><SmallCheck /></View>
                            </View>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => handleChecked(item)}>
                            <View style={{width: Dimensions.get("window").width / 4.2}}>
                                <Text style={{
                                    ...T.filterCategoryText,
                                    color: theme.titleTextColor
                                }}>
                                    {item.category}
                                </Text>
                                <CheckBox />
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                )}
            />
            
        </View>
    )
}
