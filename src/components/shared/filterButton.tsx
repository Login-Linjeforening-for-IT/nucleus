import MS from "@styles/menuStyles"
import { Image, TouchableOpacity } from "react-native"

export default function FilterButton(search: boolean, renderedArray: EventProps[], clickedCategory: CategoryWithID[], input: string, toggleSearch: ()=>void, isDark: boolean){
    return (
        <>
            {renderedArray.length > 0 || clickedCategory.length > 0 || 
                input.length ?
                    <TouchableOpacity
                        onPress={toggleSearch}
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
