import LastFetch from "@/utils/fetch"
import Space from "@/components/shared/utils"
import { useSelector } from "react-redux"
import AS from "@styles/adStyles"
import T from "@styles/text"
import React, { useEffect, useMemo, useState } from "react"
import { SvgUri } from "react-native-svg"
import capitalizeFirstLetter from "@utils/capitalizeFirstLetter"
import Link from "@components/shared/link"
import Embed from "@components/event/embed"
import Skeleton from "@components/shared/skeleton"
import {
    TouchableOpacity,
    Dimensions,
    Platform,
    Linking,
    Image,
    View,
    Text,
    ImageSourcePropType,
} from "react-native"
import Markdown from "react-native-markdown-display"

type AdClusterLocationProps = {
    ad: DetailedAd | AdProps | undefined
}

type SocialProps = {
    url: string | undefined
    source: ImageSourcePropType
}

type InfoViewProps = {
    titleNO: string
    titleEN: string
    text: string | undefined
}

type RenderDescriptionProps = {
    description: string
}

const isIOS = Platform.OS === 'ios'
/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param props
 * @returns               Small banner image
 */
export default function AdInfo({ad}: {ad: DetailedAd | undefined}) {
    const [deadline, setDeadline] = useState("")
    const loc = ad?.cities?.map(city => capitalizeFirstLetter(city)).join(", ")
    const type = capitalizeFirstLetter(ad?.job_type)
   
    useEffect(() => {
        const fetch = LastFetch(ad?.application_deadline)

        if (fetch) {
            setDeadline(fetch)
        }
    }, [])

    return (
        <View style={{marginBottom: 10}}>
            <Skeleton loading={!ad} height={60}>
                <InfoView titleNO="Sted: " titleEN="Location: " text={loc} />
                <InfoView titleNO="Ansettelsesform: " titleEN="Position: " text={type} />
                <InfoView titleNO="Frist: " titleEN="Deadline: " text={deadline} />
            </Skeleton>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdBanner({url}: {url: string | undefined}) {
    if (!url) return null

    if (url?.endsWith(".svg")) {
        return <SvgUri
            style={{alignSelf: "center", backgroundColor: "white"}}
            width={(Dimensions.get("window").width) / 1.2}
            height={Dimensions.get("window").width / 3}
            uri={`https://cdn.login.no/img/ads/${url}`}
        />
    }

    if (validFileType(url) && !url?.startsWith("http")) {
        return <Image 
            style={AS.adBanner}
            source={{uri: `https://cdn.login.no/img/ads/${url}`}}
        />
    }

    if (validFileType(url) && url?.includes("http")) {
        return <Image style={AS.adBanner} source={{uri: url}} />
    }

    return <Image
        style={AS.adBanner}
        source={{uri: "https://cdn.login.no/img/ads/adbanner.png"}} 
    />
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdClusterImage({url}: {url: string | undefined}) {

    // Handles svg icons
    if (url?.endsWith(".svg")) {
        return <SvgUri
        style={{alignSelf: "center", backgroundColor: "white", borderRadius: 5}}
        width={90}
        height={60}
        uri={`https://cdn.login.no/img/organizations/${url}`}
        />
    }
    
    // Handles png, jpg and gif icons from Login CDN
    if (validFileType(url) && !url?.startsWith("http")) {
        return <Image 
            style={AS.adBannerSmall}
            source={{uri: `https://cdn.login.no/img/organizations/${url}`}}
        />
    }

    // Handles png, jpg and gif icons from extern location
    if (validFileType(url) && url?.includes("http")) {
        return <Image style={AS.adBannerSmall} source={{uri: url}} />
    }

    // Handles missing asset (default png)
    return (
        <View style={AS.adClusterImage}>
            <Image
                style={AS.adBannerSmall}
                source={{uri: "https://cdn.login.no/img/organizations/adcompany.png"}} 
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
export function AdClusterLocation({ad}: AdClusterLocationProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const type = capitalizeFirstLetter(ad?.job_type)
    const location = ad?.cities?.map(city => capitalizeFirstLetter(city)).join(", ")
    let name =  lang ? ad?.title_no || ad?.title_en : ad?.title_en || ad?.title_no
    let info = `${type}${location ? `. ${location}`:''}`
    let halfWidth = Platform.OS === "ios" 
        ? Dimensions.get("window").width / 9 
        : Dimensions.get("window").width / 8.7805
    if (name==undefined){
        name = ""
    }
    else if (name.length > halfWidth / 1.7 
    && (type + location).length > (halfWidth*1.25)) {
        name = name.length > halfWidth / 1.1 
        ? name.substring(0, halfWidth / 1.1) + "..." 
        : name
        info = info.substring(0, halfWidth / 1.3) + "..."
    } else if (name.length > halfWidth) {
        name = name.substring(0, halfWidth) + "..."
    } else if (info.length > (Platform.OS === "ios" 
        ? halfWidth * 1.45 
        : halfWidth * 1.5)) 
    {
        info = info.substring(0, Platform.OS === "ios" 
            ? halfWidth * 1.45 
            : halfWidth * 1.5) + "..."
    }

    return (
        <View style={AS.locationView}>
            <View style = {{...AS.title}}>
                <Text style={{...AS.title, color: theme.textColor}}>
                    {name}
                </Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={{...AS.loc,color: theme.oppositeTextColor}}>
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
export function AdDescription({ad}: {ad: DetailedAd | undefined}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const content = useMemo(() => {
        const skills = ad?.skills ? ad.skills.join(", ") : []
    
        const tempShort = lang 
            ? ad?.description_short_no || ad?.description_short_en
            : ad?.description_short_en || ad?.description_short_no
        const tempLong = lang 
            ? ad?.description_long_no || ad?.description_long_en
            : ad?.description_long_en || ad?.description_long_no

        const shortDescription = tempShort ? tempShort.replace(/\\n/g, '<br>') : ''
        const LongDescription = tempLong ? tempLong.replace(/\\n/g, '<br>') : ''

        return (
            <View style={{marginBottom: 10}}>
                <Skeleton loading={!ad} height={200}>
                    <Text style={{...AS.adInfoBold, color: theme.textColor}}>
                        {lang ? "Kort fortalt" : 'In short'}
                    </Text>
                    <Text style={{...T.paragraph, color: theme.textColor}} selectable={isIOS}>
                        {shortDescription}
                    </Text>
                    <Space height={10} /> 
                    <Text style={{...AS.adInfoBold, color: theme.textColor}}>
                        {lang ? "Ferdigheter" : "Skills"}
                    </Text>
                    <Text style={{...T.paragraph, color: theme.textColor}} selectable={isIOS}>
                        {skills}
                    </Text>
                    <Space height={10} /> 
                    
                </Skeleton>
                <Skeleton loading={!ad} height={400}>
                    <Text style={{...AS.adInfoBold, color: theme.textColor}}>
                        {lang ? "Om stillingen" : 'About the position'}
                    </Text>
                    {LongDescription && <RenderDescription description={LongDescription} />}
                </Skeleton>
            </View>
        )
    }, [ad])

    return content
}

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export function AdMedia({ad}: {ad: DetailedAdResponse}) {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    const social = [
        {
            url: ad?.organization?.link_instagram,
            source: isDark
                ? require("@assets/social/instagram-white.png")
                : require("@assets/social/instagram-black.png")
        },
        {
            url: ad?.organization?.link_homepage,
            source: isDark
                ? require("@assets/social/web-white.png")
                : require("@assets/social/web-black.png")
        },
        {
            url: ad?.organization?.link_facebook,
            source: isDark 
                ? require("@assets/social/facebook-white.png") 
                : require("@assets/social/facebook-black.png")
        },
        {
            url: ad?.organization?.link_linkedin,
            source: isDark
                ? require("@assets/social/linkedin-white.png")
                : require("@assets/social/linkedin-black.png")
        },
    ]

    return (
        <View style={{marginBottom: 10}}>
            <Skeleton loading={!ad} height={70}>
                <View style={AS.socialView}>
                    {social.map((platform: SocialProps) => {
                        if (platform.url?.length) return (
                            <View key={platform.url}>
                                <Link url={platform.url}>
                                    <Image 
                                        style={AS.socialMediaImage} 
                                        source={platform.source}
                                    />
                                </Link>
                            </View>
                        )
                    })}
                </View>
                <View style={AS.socialView}>
                    {ad?.job?.application_url &&
                        <TouchableOpacity onPress={() => 
                            Linking.openURL(ad.job.application_url)}>
                            <View style={{
                                ...AS.adButton,
                                backgroundColor: theme.orange
                            }}>
                                <Text style={{
                                    ...AS.adButtonText,
                                    color: theme.textColor
                                }}>
                                    {lang ? "Søk nå":"Apply"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </Skeleton>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdTitle({ad}: {ad: DetailedAdResponse}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const title = lang ? ad?.job?.title_no || ad?.job?.title_en : ad?.job?.title_en || ad?.job?.title_no
    const logo = ad?.organization?.logo

    function Logo() {
        // Handles svg icons
        if (logo?.endsWith(".svg")) {
            return <SvgUri
                style={{alignSelf: "center", backgroundColor: "white", marginTop: 12}}
                width={90}
                height={60}
                uri={`https://cdn.login.no/img/organizations/${logo}`}
            />
        }

        // Handles png, jpg and gif icons from Login CDN
        if (validFileType(logo) && !logo?.startsWith("http")) {
            return <Image 
                style={AS.adBannerSmall}
                source={{uri: `https://cdn.login.no/img/organizations/${logo}`}}
            />
        }

        // Handles png, jpg and gif icons from extern location
        if (validFileType(logo) && logo?.includes("http")) {
            return <Image style={AS.adBannerSmall} source={{uri: logo}} />
        }

        // Handles missing asset (default png)
        return (
            <View style={AS.adClusterImage}>
                <Image
                    style={AS.adBannerSmall}
                    source={{uri: "https://cdn.login.no/img/ads/adcompany.png"}} 
                />
            </View>
        )
    }

    return (
        <View style={{flexDirection: !ad ? undefined : 'row', marginBottom: 10}}>
            <Skeleton loading={!ad} height={60}>
                <Logo />
                <Text style={{...AS.specificAdTitle, color: theme.textColor}}>
                    {title}
                </Text>
            </Skeleton>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdUpdateInfo({ad}: {ad: DetailedAd | undefined}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const updated = LastFetch(ad?.updated_at)
    const created = LastFetch(ad?.time_publish)
    const didUpdate = created !== updated
    const textNO = ["Oppdatert kl:", "Opprettet kl:"]
    const textEN = ["Updated:", "Created:"]
    const text = lang ? textNO : textEN

    return (
        <View style={{marginBottom: 10}}>
            <Skeleton loading={!ad} height={15}>
                {didUpdate && <Text style={{
                    ...T.contact,
                    fontSize: 12,
                    marginBottom: 5,
                    color: theme.oppositeTextColor
                }}>
                    {text[0]} {updated}.
                </Text>}
                {!didUpdate && <Text style={{...T.contact, fontSize: 12, color: theme.oppositeTextColor}}>
                    {text[1]} {created}.
                </Text>}
            </Skeleton>
            <Text style={{...T.contact, fontSize: 12, marginTop: 5, color: theme.oppositeTextColor}}>
                Ad ID: {ad?.id}
            </Text>
        </View>
    )
}

function InfoView({titleNO, titleEN, text}: InfoViewProps) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    if (!text) return null

    return (
        <View style={AS.adInfoInsideView}>
            <Text style={{
                ...AS.adInfoType, width: lang ? "40%" : "25%", 
                color: theme.oppositeTextColor
            }}>
                {lang ? titleNO : titleEN}
            </Text>
            <Text style={{...AS.adInfo, color: theme.textColor}}>
                {text}
            </Text>
        </View>
    )
}

function validFileType(url: string | undefined) {
    if (url?.endsWith(".png") 
        || url?.endsWith(".jpg") 
        || url?.endsWith(".jpg") 
        || url?.endsWith(".jpeg") 
        || url?.endsWith(".gif")
    ) return true

    return false
}

function RenderDescription({description}: RenderDescriptionProps) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const content = useMemo(() => {
        if (!description) return null

        const embededEvent = /(\[:\w+\]\(\d+\))/
        const findNumber = /\((\d+)\)/
        const split = description.replace(/\\n/g, '<br>').split(embededEvent)

        return split.map((content, index) => {
            const sliced = content.slice(0, 50000)
            const match = sliced.match(findNumber)
            const number = match ? Number(match[1]) : null
            const markdown = sliced.replace(/<br>/g, '\n').replace(/###/g, '')

            if (!sliced.includes('[:event]') && !sliced.includes('[:jobad]')) {
                return <Markdown key={index} style={{text: {color: '#FFF'}}}>{markdown}</Markdown>
            }

            return <Embed key={index} id={number} type={sliced.includes('[:event]') ? "event" : "ad"} />
        })
    }, [lang, description, theme.textColor])

    return content
}
