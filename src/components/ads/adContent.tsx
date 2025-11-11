import AS from "@styles/adStyles"
import validFileType from "@utils/validFileType"
import { Image, Platform, View, Text, Dimensions } from "react-native"
import { SvgUri } from "react-native-svg"
import { useSelector } from "react-redux"
import capitalizeFirstLetter from "@utils/capitalizeFirstLetter"
import config from "@/constants"

type AdClusterLocationProps = {
    ad: GetJobProps | undefined
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdClusterImage({ url }: { url: string | undefined }) {

    // Handles svg icons
    if (url?.endsWith(".svg")) {
        return <SvgUri
            style={{ alignSelf: "center", backgroundColor: "white", borderRadius: 5 }}
            width={90}
            height={60}
            uri={`${config.cdn}/organizations/${url}`}
        />
    }

    // Handles png, jpg and gif icons from Login CDN
    if (validFileType(url) && !url?.startsWith("http")) {
        return <Image
            style={AS.adBannerSmall}
            source={{ uri: `${config.cdn}/organizations/${url}` }}
        />
    }

    // Handles png, jpg and gif icons from extern location
    if (validFileType(url) && url?.includes("http")) {
        return <Image style={AS.adBannerSmall} source={{ uri: url }} />
    }

    // Handles missing asset (default png)
    return (
        <View style={AS.adClusterImage}>
            <Image
                style={AS.adBannerSmall}
                source={{ uri: `${config.cdn}/organizations/adcompany.png` }}
            />
        </View>
    )
}

/**
 * Visual representation of the location on the Ad Cluster
 *
 * @param {AdProps} ad  Ad object
 * @returns
 */
export function AdClusterLocation({ ad }: AdClusterLocationProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const type = capitalizeFirstLetter(ad?.job_type)
    const location = ad?.cities?.map(city => capitalizeFirstLetter(city)).join(", ")
    let name = lang ? ad?.title_no || ad?.title_en : ad?.title_en || ad?.title_no
    let info = `${type}${location ? `. ${location}` : ''}`
    let halfWidth = Platform.OS === "ios"
        ? Dimensions.get("window").width / 9
        : Dimensions.get("window").width / 8.7805
    if (name == undefined) {
        name = ""
    }
    else if (name.length > halfWidth / 1.7
        && (type + location).length > (halfWidth * 1.25)) {
        name = name.length > halfWidth / 1.1
            ? name.substring(0, halfWidth / 1.1) + "..."
            : name
        info = info.substring(0, halfWidth / 1.3) + "..."
    } else if (name.length > halfWidth) {
        name = name.substring(0, halfWidth) + "..."
    } else if (info.length > (Platform.OS === "ios"
        ? halfWidth * 1.45
        : halfWidth * 1.5)) {
        info = info.substring(0, Platform.OS === "ios"
            ? halfWidth * 1.45
            : halfWidth * 1.5) + "..."
    }

    return (
        <View style={AS.locationView}>
            <View style={{ ...AS.title }}>
                <Text style={{ ...AS.title, color: theme.textColor }}>
                    {name}
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ ...AS.loc, color: theme.oppositeTextColor }}>
                    {info}
                </Text>
            </View>
        </View>
    )
}
