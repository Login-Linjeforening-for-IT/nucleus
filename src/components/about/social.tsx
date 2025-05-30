import CornerSquare from "@/components/about/cornerSquare"
import ES from "@styles/eventStyles"
import GS from "@styles/globalStyles"
import Link, { TextLink } from "@components/shared/link"
import T from "@styles/text"
import { useSelector } from "react-redux"
import { random } from "@/components/shared/utils"
import personInfo from "@utils/personInfo"
import {
    Image,
    ImageSourcePropType,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { 
    CDN, 
    DISCORD_URL, 
    FACEBOOK_URL, 
    GITLAB_URL, 
    INSTAGRAM_URL, 
    LINKEDIN_URL, 
    MAILTO_URL, 
    MAIL_URL, 
    WIKI_URL 
} from "@/constants"

type PersonProps = {
    person: string
}

type MediaLogoProps = {
    link: string
    logo: ImageSourcePropType
}

type MediaProps = {
    [key: string]: { 
        link: string 
        logo: ImageSourcePropType 
    }
}

type StaticImageProps = {
    category: string
}

/**
 * **Person object**
 *
 * Includes:
 * - Title
 * - Name
 * - Discord tag
 * - Discord link
 * - CDN image link
 *
 * @param {string} person
 * @returns Full object packed in a view component
 */
export default function Person({person}: PersonProps): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    let obj = personInfo({person, lang})
    let corner = random({min: 0, max: 4})

    return (
        <View style={{marginBottom: 20}}>
            <Image style={{...GS.personImage}} source={{uri: obj.img}} />
            <CornerSquare corner={corner} />
            <Text style={T.leaderTitle}>{obj.title}</Text>
            <Text style={{...T.leaderName, color: theme.textColor}}>
                {obj.name}
            </Text>
            <Link url={obj.dclink}>
                <Text style={{...T.discord, color: theme.discord}}>
                    <Image 
                        style={GS.tiny} 
                        source={require("@assets/social/discord-colored.png")}
                    />
                    {obj.tag}
                </Text>
            </Link>
        </View>
    )
}

/**
 * Function for displaying all committees
 * @returns View containing all committees
 */
export function AllComitees(): JSX.Element {
    return (
        <View>
            <Person person="leader" />
            <Person person="coleader" />
            <Person person="secretary" />
            <Person person="evntkom" />
            <Person person="pr" />
            <Person person="tekkom" />
            <Person person="ctf" />
            <Person person="eco" />
            <Person person="bedkom" />
        </View>
    )
}

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export function Social() {
    const { isDark } = useSelector((state: ReduxState) => state.theme)

    const media: MediaProps = {
        discord: {
            link: DISCORD_URL,
            logo: isDark 
                ? require("@assets/social/discord-white.png") 
                : require("@assets/social/discord-black.png")
        },
        instagram: {
            link: INSTAGRAM_URL,
            logo: isDark 
                ? require("@assets/social/instagram-white.png")
                : require("@assets/social/instagram-black.png")
        },
        facebook: {
            link: FACEBOOK_URL,
            logo: isDark 
                ? require("@assets/social/facebook-white.png")
                : require("@assets/social/facebook-black.png")
        },
        linkedin: {
            link: LINKEDIN_URL,
            logo: isDark 
                ? require("@assets/social/linkedin-white.png")
                : require("@assets/social/linkedin-black.png")
        },
        gitlab: {
            link: GITLAB_URL,
            logo: isDark 
                ? require("@assets/social/gitlab-white.png")
                : require("@assets/social/gitlab-black.png")
        },
        wiki: {
            link: WIKI_URL,
            logo: isDark 
                ? require("@assets/social/wiki-white.png")
                : require("@assets/social/wiki-black.png")
        }
    }

    return (
        <View style={{
            flexDirection: "row", 
            justifyContent: "center", 
            marginTop: 10
        }}>
            {Object.values(media).map((item, index) => (
                <MediaLogo 
                    key={item.link} 
                    link={item.link} 
                    logo={media[Object.keys(media)[index]].logo} 
                />
        ))}
        </View>
    )
}

/**
 * **Person object**
 *
 * Includes:
 * - Title
 * - Name
 * - Discord tag
 * - Discord link
 * - CDN image link
 *
 * @param person
 * @returns Full object packed in a view component
 */
export function Styret() {
    let corner = random({min: 0, max: 4})

    return (
        <View>
            <Image 
                style={{...GS.aboutImage}} 
                source={{uri: `${CDN}board/gruppebilde.JPG`}}
            />
            <CornerSquare corner={corner} type={true} />
        </View>
    )
}

/**
 * Function for displaying the contact info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Contact info
 */
export function Contact() {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const color = theme.textColor

    const info = {
        contact: lang ? "Kontakt" : "Contact",
        name: "Login - Linjeforeningen for IT",
        address: "Teknologivegen 22",
        location: lang ? "Bygg A, rom 155" : "Building A, room 155",
        post: "2815 GJØVIK"
    }

    return (
        <View>
            <Text style={{...T.centeredBold20, color: color}}>{info.contact}</Text>
            <Text style={{...T.centered15, color: color}}>{info.name}</Text>
            <Text style={{...T.centered15, color: color}}>{info.location}</Text>
            <Text style={{...T.centered15, color: color}}>{info.address}</Text>
            <Text style={{...T.centered15, color: color}}>{info.post}</Text>

            <TextLink 
                url={MAILTO_URL}
                text={MAIL_URL}
                style={{...T.orange15, top: 3.2, alignSelf: "center", marginBottom: 20}}
            />
        </View>
    )
}

/**
 * Function for displaying the copyright info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Copyright view
 */
export function Copyright() {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <Text style={{...T.copyright, color: theme.oppositeTextColor}}>
                {`${lang ? "Opphavsrett" : "Copyright"} © 2022-${new Date().getFullYear()} Login - Linjeforeningen for IT\nD-U-N-S 345 129 409\nNO 811 940 372`}
            </Text>
        </View>
    )
}

function MediaLogo({link, logo}: MediaLogoProps) {
    return (
        <View style={GS.socialPartView}>
            <TouchableOpacity onPress={() => Linking.openURL(link)}>
                <Image style={GS.medium} source={logo} />
            </TouchableOpacity>
        </View>
    )
}

export function StaticImage({category}: StaticImageProps): JSX.Element {
    const images: Record<string, ImageSourcePropType> = {
        tekkom:  require(`../../../public/assets/committee/tekkom/tekkom.png`),
        ctf:     require(`../../../public/assets/committee/ctfkom/ctf.png`),
        bedpres: require(`../../../public/assets/committee/bedkom/bedkom.png`),
        sosialt:  require(`../../../public/assets/categories/sosialt.png`),
        social:  require(`../../../public/assets/categories/sosialt.png`),
        login:   require(`../../../public/assets/categories/login.png`),
        annet:   require(`../../../public/assets/categories/annet.png`),
    }
    const image = images[category.toLowerCase()] || images.annet

    return <Image style={ES.specificEventImage} source={image} />
}
