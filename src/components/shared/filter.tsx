import FetchColor from "@styles/fetchTheme"
import ES from "@styles/eventStyles"
import MS from "@styles/menuStyles"
import T from "@styles/text"
import React from "react"
import { CheckBox, CheckedBox, SmallCheck } from "@components/event/check"
import { reset, setInput, toggleSearch } from "@redux/event"
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

type FilterUIProps = {
    textInputRef: React.RefObject<TextInput>
    setClickedCategory: React.Dispatch<React.SetStateAction<CategoryWithID[]>>
    clickedCategory: CategoryWithID[]
}

/**
 * User interface for the filter
 *
 * @param textInputRef       Ref for text input
 * @param setRenderedEvents  Function to set the renderedEvents
 * @param setClickedCategory Function to set the ClickedCategory
 * @param categories         Function to filter out relevant categories for the filter
 * @param clickedCategory    Array containing all clicked categories
 *
 * @returns Filter UI
 */
export function FilterUI({textInputRef, setClickedCategory, clickedCategory}: FilterUIProps): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { search, categories } = useSelector((state: ReduxState) => state.event)
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
