import MS from "@styles/menuStyles"
import { TouchableOpacity } from "react-native"
import handleDownload from "@/utils/calendar"
import { Image } from "react-native"
import { timeSince } from "@/utils/fetch"
import { useSelector, useDispatch } from "react-redux"

type DownloadButtonProps = {
    clickedEvents: EventProps[]
    setDownloadState: React.Dispatch<React.SetStateAction<Date>>
    downloadState: Date
}

export default function DownloadButton({clickedEvents, setDownloadState, 
downloadState}: DownloadButtonProps){
    const { isDark } = useSelector((state: ReduxState) => state.theme)
    const { calendarID } = useSelector((state: ReduxState) => state.misc)
    const dispatch = useDispatch()

    return(
        <>
            {clickedEvents.length > 0 &&
                <TouchableOpacity
                    onPress={async() => await handleDownload({
                        setDownloadState, downloadState, clickedEvents, 
                        calendarID, dispatch})}>
                    <Image
                        style={MS.multiIcon}
                        source={isDark
                            ? timeSince(downloadState) >= 1000 
                                ? require("@assets/icons/download.png")
                                : require("@assets/icons/download-orange.png")
                            : require("@assets/icons/download-black.png")} />
                </TouchableOpacity>
            }
        </>
    )
}
