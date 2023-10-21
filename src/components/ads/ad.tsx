import LastFetch from "@/utils/fetch"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import { useSelector } from "react-redux"
import AS from "@styles/adStyles"
import T from "@styles/text"
import React, { useEffect, useState } from "react"
import {
    TouchableOpacity,
    Dimensions,
    Platform,
    Linking,
    Image,
    View,
    Text,
    ImageSourcePropType
} from "react-native"

type AdClusterLocationProps = {
    ad: AdProps
}

type SocialProps = {
    url: string
    source: ImageSourcePropType
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param props
 * @returns               Small banner image
 */
export default function AdInfo({props}: {props: AdProps}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const [deadline, setDeadline] = useState("")
    const loc = props.city
    const type = props.job_type
   
    useEffect(() => {
        (async() => {
            const fetch = await LastFetch(props.application_deadline)

            if (fetch) {
                setDeadline(fetch)
            }
        })()
    }, [])

    return (
        <View style={{marginBottom: 10}}>
            <View style={AS.adInfoInsideView}>
                <Text style={{
                    ...AS.adInfoType, width: lang ? "40%" : "25%", 
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {lang ? "Sted: " : "Location: "}
                </Text>
                <Text style={{
                    ...AS.adInfo, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {loc}
                </Text>
            </View>
            <View style={AS.adInfoInsideView}>
                <Text style={{
                    ...AS.adInfoType, 
                    width: lang ? "40%" : "25%",
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {lang ? "Ansettelsesform: " : "Position: "}
                </Text>
                <Text style={{
                    ...AS.adInfo, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {type}
                </Text>
            </View>
            <View style={AS.adInfoInsideView}>
                <Text style={{
                    ...AS.adInfoType, 
                    width: lang ? "40%" : "25%", 
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {lang ? "Frist: " : "Deadline: "}
                </Text>
                <Text style={{
                    ...AS.adInfo, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {deadline}
                </Text>
            </View>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdBanner({url}: {url: string}) {

    return (
        <View style={{marginBottom: 10}}>
            <Image
                style={AS.adBanner}
                source={{uri: url
                    ? url
                    : "https://cdn.login.no/img/ads/adbanner.png"}}
                />
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdClusterImage({url}: {url: string}) {

    return (
        <View style={AS.adClusterImage}>
            <Image
                style={AS.adBannerSmall}
                source={{uri: url
                    ? url
                    : "https://cdn.login.no/img/ads/adcompany.png"}}/>
        </View>
    )
}

/**
 * Visual representation of the location on the Ad Cluster
 *
 * @param {AdProps} ad  Ad object
 * @param {number} theme Theme of the app
 * @returns
 */
export function AdClusterLocation({ad}: AdClusterLocationProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const tempName = ad.title_no
    const tempType = "Fulltid"
    const tempLoc = "Gjøvik, Oslo, Stavanger, Bergen, Trondheim, Login Loungen"
    let name = tempName
    let info = tempType + ", " + tempLoc
    let halfWidth = Platform.OS === "ios" 
        ? Dimensions.get("window").width / 9 
        : Dimensions.get("window").width / 8.7805
    if (tempName.length > halfWidth / 1.7 
    && (tempType + tempLoc).length > (halfWidth*1.25)) {
        name = tempName.length > halfWidth / 1.1 
        ? tempName.substring(0, halfWidth / 1.1) + "..." 
        : tempName
        info = info.substring(0, halfWidth / 1.3) + "..."
    } else if (tempName.length > halfWidth) {
        name = tempName.substring(0, halfWidth) + "..."
    } else if (info.length > (Platform.OS === "ios" 
        ? halfWidth*1.45 
        : halfWidth*1.5)) 
    {
        info = info.substring(0, Platform.OS === "ios" 
            ? halfWidth*1.45 
            : halfWidth*1.5) + "..."
    }

    return (
        <View style={AS.locationView}>
            <View style = {{...AS.title}}>
                <Text style={{
                    ...AS.title, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {name}
                </Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={{
                    ...AS.loc,
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {info}
                </Text>
            </View>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {AdProps} ad Ad object
 * @returns Ad description element
 */
export function AdDescription({ad}: {ad: AdProps}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const skills = ad.skill
    const shortDescription = lang 
        ? ad.description_short_no 
        : ad.description_short_en
    const LongDescription = lang 
        ? ad.description_long_no 
        : ad.description_long_en

    return (
        <View style={{marginBottom: 10}}>
            <Text style={{
                ...AS.adInfoBold, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                Kort fortalt
            </Text>
            <Text style={{
                ...T.paragraph, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {shortDescription}
            </Text>
            <Space height={10} /> 
            <Text style={{
                ...AS.adInfoBold, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>{lang ? "Ferdigheter" : "Skills"}</Text>
            <Text style={{
                ...T.paragraph, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {skills}
                </Text>
                <Space height={10} /> 
            <Text style={{
                ...AS.adInfoBold, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    Om stillingen
                </Text>
            <Text style={{
                ...T.paragraph, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {LongDescription}
                </Text>
        </View>
    )
}

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export function AdMedia({ad}: {ad: AdProps}) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

    const social = [
        {
            url: ad.link_discord,
            source: isDark 
                ? require("@assets/social/discord-white.png")
                : require("@assets/social/discord-black.png")
        },
        {
            url: ad.link_instagram,
            source: isDark
                ? require("@assets/social/instagram-white.png")
                : require("@assets/social/instagram-black.png")
        },
        {
            url: ad.link_homepage,
            source: isDark
                ? require("@assets/social/web-white.png")
                : require("@assets/social/web-black.png")
        },
        {
            url: ad.link_facebook,
            source: isDark 
                ? require("@assets/social/facebook-white.png") 
                : require("@assets/social/facebook-black.png")
        },
        {
            url: ad.link_linkedin,
            source: isDark
                ? require("@assets/social/linkedin-white.png")
                : require("@assets/social/linkedin-black.png")
        },
    ]

    return (
        <View style={{marginBottom: 10}}>
            <View style={AS.socialView}>
                {social.map((platform: SocialProps) => {
                    if (platform.url.length) return (
                        <View key={platform.url}>
                            <TouchableOpacity onPress={() => 
                                Linking.openURL(platform.url)}>
                                <Image 
                                    style={AS.socialMediaImage} 
                                    source={platform.source}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <Space height={10} /> 
            <View style={AS.socialView}>
                {ad.application_url ?
                    <TouchableOpacity onPress={() => 
                    Linking.openURL(ad.application_url)}>
                    <View style={{
                        ...AS.adButton,
                        backgroundColor: FetchColor({theme, variable: "ORANGE"})
                    }}>
                        <Text style={{
                            ...AS.adButtonText,
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {lang ? "Søk nå":"Apply"}
                        </Text>
                    </View>
                </TouchableOpacity>:null
                }
            </View>
            <Space height={10} /> 
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdTitle({ad}: {ad: AdProps}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const bannerURL  = ad.banner_image
    const title = (lang 
        ? ad.title_no + " hos "
        : ad.title_en + " at "
    ) + ad.organization

    return (
        <View style={AS.adTitleView}>
            <Image 
                style={AS.adBannerSmall}
                source={{uri: bannerURL 
                    ? bannerURL
                    : "https://cdn.login.no/img/ads/adcompany.png"
                }}
            />
            <Text style={{
                ...AS.specificAdTitle, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {title}
            </Text>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdUpdateInfo({ad}: {ad: AdProps}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const updated = LastFetch(ad.updated_at)
    const created = LastFetch(ad.created_at)

    const textNO = ["Oppdatert kl:", "Opprettet kl:"]
    const textEN = ["Updated:", "Created:"]
    const text = lang ? textNO : textEN

    return (
        <View style={{marginBottom: 10}}>
            <Text style={{
                ...T.contact, 
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                {text[0]} {!updated}.
            </Text>
            <Space height={5} /> 
            <Text style={{
                ...T.contact,
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                {text[1]} {!created}.
            </Text>
        </View>
    )
}
