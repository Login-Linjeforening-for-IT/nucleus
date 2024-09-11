import LastFetch from "@/utils/fetch"
import Space from "@/components/shared/utils"
import { useSelector } from "react-redux"
import AS from "@styles/adStyles"
import T from "@styles/text"
import { useEffect, useMemo, useState } from "react"
import { SvgUri } from "react-native-svg"
import Link from "@components/shared/link"
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
import RenderDescription from "./adDescription"
import capitalizeFirstLetter from "@utils/capitalizeFirstLetter"
import validFileType from "@utils/validFileType"
import { CDN } from "@/constants"

type SocialProps = {
    url: string | undefined
    source: ImageSourcePropType
}

type InfoViewProps = {
    titleNO: string
    titleEN: string
    text: string | undefined
}

const isIOS = Platform.OS === 'ios'
/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param ad Ad object to display the info for
 * @returns Small banner image
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
            uri={`${CDN}ads/${url}`}
        />
    }

    if (validFileType(url) && !url?.startsWith("http")) {
        const [width, setWidth] = useState(1)
        const [height, setHeight] = useState(1)
        useEffect(() => {
            Image.getSize(`${CDN}ads/${url}`, (width, height) => {
                setWidth(width)
                setHeight(height)
            })
        }), [url]
        return <Image
            style={{...AS.adBanner, aspectRatio: width / height}}
            source={{uri: `${CDN}ads/${url}`}}
        />
    }

    if (validFileType(url) && url?.includes("http")) {
        return <Image style={AS.adBanner} source={{uri: url}} />
    }

    return <Image
        style={AS.adBanner}
        source={{uri: `${CDN}ads/adbanner.png`}} 
    />
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
                uri={`${CDN}organizations/${logo}`}
            />
        }

        // Handles png, jpg and gif icons from Login CDN
        if (validFileType(logo) && !logo?.startsWith("http")) {
            return <Image 
                style={AS.adBannerSmall}
                source={{uri: `${CDN}organizations/${logo}`}}
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
                    source={{uri: `${CDN}ads/adcompany.png`}} 
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
                    ...T.text12,
                    marginBottom: 5,
                    color: theme.oppositeTextColor
                }}>
                    {text[0]} {updated}.
                </Text>}
                {!didUpdate && <Text style={{...T.contact, ...T.text12, color: theme.oppositeTextColor}}>
                    {text[1]} {created}.
                </Text>}
            </Skeleton>
            <Text style={{...T.contact, ...T.text12, marginTop: 5, color: theme.oppositeTextColor}}>
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

