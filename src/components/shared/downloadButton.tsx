import MS from "@styles/menuStyles";
import { TouchableOpacity } from "react-native";
import handleDownload from "@/utils/calendar"
import { AnyAction, Dispatch } from "redux";
import { Image } from "react-native";
import { timeSince } from "@/utils/fetch";

export default function DownloadButton(clickedEvents: EventProps[], 
    setDownloadState: React.Dispatch<React.SetStateAction<Date>>, downloadState: 
    Date, calendarID: string, dispatch: Dispatch<AnyAction>, isDark: boolean){
    return(
        <>
            {clickedEvents.length > 0 ?
                <TouchableOpacity
                    onPress={async () => await handleDownload({
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
            :null}
        </>
    )
}
