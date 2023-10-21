import FetchColor from "@styles/fetchTheme"
import ES from "@styles/eventStyles"
import MS from "@styles/menuStyles"
import T from "@styles/text"
import React, { useRef } from "react"
import { CheckBox, CheckedBox, SmallCheck } from "@components/event/check"
import { reset, setClickedCategories, setInput, toggleSearch } from "@redux/event"
import { useSelector, useDispatch } from "react-redux"
import {
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    View,
    Text,
    Platform,
} from "react-native"

/**
 * User interface for the filter
 * @returns Filter UI
 */
export function FilterUI(): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { search, categories, clickedCategories } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()
    const textInputRef = useRef<TextInput | null>(null)    

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
                    onChangeText={(val) => dispatch(setInput(val))}
                    selectionColor={FetchColor({theme, variable: "ORANGE"})}
                />
                <TouchableOpacity onPress={() => {
                    dispatch(reset())
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
                        {clickedCategories.includes(item) ?
                            <TouchableOpacity onPress={() => dispatch(setClickedCategories(clickedCategories.filter((category: CategoryWithID) => category.id !== item.id)))}>
                                <View>
                                    <Text style={{...T.filterCategoryText, color: FetchColor({theme, variable: "TITLETEXTCOLOR"})}}>{item.category}</Text>
                                    <View><CheckedBox/></View>
                                    <View><SmallCheck/></View>
                                </View>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => dispatch(setClickedCategories([...clickedCategories, item]))}>
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

/**
 * Displays the filter button
 * @returns Filter button
 */
export function FilterButton(){
    const { isDark } = useSelector((state: ReduxState) => state.theme)
    const { search } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()

    return (
        <TouchableOpacity onPress={() => dispatch(toggleSearch())}>
            {search
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
