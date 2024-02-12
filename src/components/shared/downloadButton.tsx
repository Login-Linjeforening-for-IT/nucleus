import MS from "@styles/menuStyles"
import { ImageSourcePropType, TouchableOpacity } from "react-native"
import handleDownload from "@/utils/calendar"
import { Image } from "react-native"
import { timeSince } from "@/utils/fetch"
import { useSelector, useDispatch } from "react-redux"
import { setDownloadState } from "@redux/event"
import { useState } from "react"

export default function DownloadButton(){
    const { isDark } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { calendarID } = useSelector((state: ReduxState) => state.misc)
    const { clickedEvents, downloadState } = useSelector((state: ReduxState) => state.event)
    const dark: ImageSourcePropType = require("@assets/icons/download.png")
    const light: ImageSourcePropType = require("@assets/icons/download-black.png")
    const orange: ImageSourcePropType = require("@assets/icons/download-orange.png")
    const [icon, setIcon] = useState<ImageSourcePropType>(isDark ? dark : light)
    const dispatch = useDispatch()

    function flashOrange() {
        setIcon(orange)
        setTimeout(() => {
            setIcon(isDark ? dark : light)
        }, 500);
    }

    return (
        <>
            {clickedEvents.length > 0 &&
                <TouchableOpacity
                    onPress={async() => {
                        if (timeSince(downloadState || 1000) >= 1000) {
                            flashOrange()
                            dispatch(setDownloadState())
                            await handleDownload({clickedEvents, 
                                calendarID, dispatch, lang})
                        }
                        }}>
                    <Image style={MS.multiIcon} source={icon} />
                </TouchableOpacity>
            }
        </>
    )
}
