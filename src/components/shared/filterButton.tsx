import MS from "@styles/menuStyles"
import { Image, TouchableOpacity } from "react-native"
import { toggleSearch } from "@redux/event"

import { AnyAction, Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

type FilterButtonProps = {
    renderedArray: EventProps[]
    clickedCategory: CategoryWithID[]
    input: string
    dispatch: Dispatch<AnyAction>
}

export default function FilterButton({renderedArray, clickedCategory, input}: FilterButtonProps){
    const { isDark } = useSelector((state: ReduxState) => state.theme)
    const { search } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()

    if (!renderedArray.length && !clickedCategory.length && !input.length) {
        return <></>
    }
    
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
