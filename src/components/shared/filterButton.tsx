import MS from "@styles/menuStyles"
import { Image, TouchableOpacity } from "react-native"
import { toggleSearch } from "@redux/event"

import { AnyAction, Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

type FilterButtonProps = {
    clickedCategory: CategoryWithID[]
    input: string
    dispatch: Dispatch<AnyAction>
}

export default function FilterButton({clickedCategory, input}: FilterButtonProps){
    const { isDark } = useSelector((state: ReduxState) => state.theme)
    const { search, renderedEvents } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()

    if (!renderedEvents.length && !clickedCategory.length && !input.length) {
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
