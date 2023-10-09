import MS from "@styles/menuStyles"
import { Image, TouchableOpacity } from "react-native"
import { toggleSearch } from "@redux/event"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import { AnyAction, Dispatch } from "redux"

type FilterButtonProps = {
    renderedArray: EventProps[]
    clickedCategory: CategoryWithID[]
    input: string
    isDark: boolean
    dispatch: Dispatch<AnyAction>
    search: boolean
}

export default function FilterButton({renderedArray, clickedCategory, input, isDark, dispatch, search}: FilterButtonProps){

    return (
        <>
            {renderedArray.length > 0 || clickedCategory.length > 0 || 
                input.length ?
                    <TouchableOpacity
                        onPress={() => dispatch(toggleSearch())}
                    >
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
                :null
            }
        </>
    )
}
