import CornerSquare from "@/components/about/cornerSquare"
import Space, { random } from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React from "react"
import {
    TouchableOpacity,
    Linking,
    Image,
    Alert,
    View,
    Text,
    ImageSourcePropType,
} from "react-native"
import ES from "@styles/eventStyles"

type PersonProps = {
    person: string
    lang: boolean
}

type MediaLogoProps = {
    link: string
    logo: ImageSourcePropType
}

type AllCommitteesProps = {
    lang: boolean
}

type personInfoProps = {
    person: string
    lang: boolean
}

type MediaProps = {
    [key: string]: { 
        link: string 
        logo: ImageSourcePropType 
    }
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
export default function Person({person, lang}: PersonProps): JSX.Element {

    let obj = personInfo({person, lang})
    let corner = random({min: 0, max: 4})
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <Image style={{...GS.personImage}} source={{uri: obj.img}} />
            {Space(10)}
            <View style={{position: "absolute", alignSelf: "center"}}>{CornerSquare({theme, corner})}</View>
            <Text style={T.leaderTitle}>{obj.title}</Text>
            {Space(5)}
            <Text style={{
                ...T.leaderName, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {obj.name}
            </Text>
            {Space(5)}
            <TouchableOpacity onPress={() => Linking.openURL(obj.dclink)}>
                <Text style={{...T.discord, color: FetchColor({theme, variable: "DISCORD"})}}>
                    {<Image 
                        style={GS.tiny} 
                        source={require("@assets/social/discord-colored.png")}
                    />}
                    {obj.tag}
                </Text>
            </TouchableOpacity>
            {Space(25)}
        </View>
    )
}

/**
 * Function for displaying all committees
 * @returns View containing all committees
 */
export function AllComitees({lang}: AllCommitteesProps): JSX.Element {
    return (
        <View>
            <Person person="leader" lang={lang} />
            <Person person="coleader" lang={lang} />
            <Person person="secretary" lang={lang} />
            <Person person="evntkom" lang={lang} />
            <Person person="pr" lang={lang} />
            <Person person="tekkom" lang={lang} />
            <Person person="ctf" lang={lang} />
            <Person person="eco" lang={lang} />
            <Person person="bedkom" lang={lang} />
        </View>
    )
}
/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export function Social() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

    const media: MediaProps = {
        discord: {
            link: "https://discord.com/invite/login-ntnu",
            logo: isDark 
                ? require("@assets/social/discord-white.png") 
                : require("@assets/social/discord-black.png")
        },
        instagram: {
            link: "https://www.instagram.com/login_linjeforening/",
            logo: isDark 
                ? require("@assets/social/instagram-white.png")
                : require("@assets/social/instagram-black.png")
        },
        facebook: {
            link: "https://facebook.com/LogNTNU",
            logo: isDark 
                ? require("@assets/social/facebook-white.png")
                : require("@assets/social/facebook-black.png")
        },
        linkedin: {
            link: "https://linkedin.com/company/linjeforeningen-@about",
            logo: isDark 
                ? require("@assets/social/linkedin-white.png")
                : require("@assets/social/linkedin-black.png")
        },
        gitlab: {
            link: "https://git.logntnu.no",
            logo: isDark 
                ? require("@assets/social/gitlab-white.png")
                : require("@assets/social/gitlab-black.png")
        },
        wiki: {
            link: "https://wiki.login.no",
            logo: isDark 
                ? require("@assets/social/wiki-white.png")
                : require("@assets/social/wiki-black.png")
        }
    }

    return (
        Object.entries(media).map(([link], index) => {
            return index % 3 === 0 && (
                <View key={link} style={GS.socialView}>
                    <MediaLogo 
                        key={link} 
                        link={link} 
                        logo={media[Object.keys(media)[index]].logo} 
                    />
                    <MediaLogo 
                        key={media[Object.keys(media)[index + 1]].link} 
                        link={media[Object.keys(media)[index + 1]].link} 
                        logo={media[Object.keys(media)[index + 1]].logo}
                    />
                    <MediaLogo 
                        key={media[Object.keys(media)[index + 2]].link} 
                        link={media[Object.keys(media)[index + 2]].link}
                        logo={media[Object.keys(media)[index + 2]].logo}
                    />
                </View>
            )
        })
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
 * @param {string} person
 * @returns Full object packed in a view component
 */
export function Styret() {

    let corner = random({min: 0, max: 4})
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <Image 
                style={{...GS.aboutImage}} 
                source={{uri: "https://cdn.login.no/img/styret2.jpg"}}
            />
            <View style={{position: "absolute", alignSelf: "center"}}>
                {CornerSquare({theme, corner, type: true})}
            </View>
        </View>
    )
}

/**
 * Function for displaying the contact info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Contact info
 */
export function Kontakt() {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const info = {
        contact: lang ? "Kontakt" : "Contact",
        name: "Login - Linjeforeningen for IT",
        address: "Teknologivegen 22",
        location: lang ? "Bygg A, rom 155" : "Building A, room 155",
        post: "2815 GJØVIK"
    }

    return (
    <View>
        <Text/>
        <Text style={{...T.centeredBold25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info.contact}</Text>
        <Text style={{...T.centered15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info.name}</Text>
        <Text style={{...T.centered15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info.address}</Text>
        <Text style={{...T.centered15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info.location}</Text>
        <Text style={{...T.centered15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info.post}</Text>
        <Text/>
        <Text 
            style={{
                ...T.orangeCentered15, 
                color: FetchColor({theme, variable: "ORANGE"})}} 
            onPress={async() => {Linking.openURL("mailto:kontakt@login.no")
            .catch(() => lang 
                ? Alert.alert("Kunne ikke åpne mail!", "Mail: kontakt@login.no")
                : Alert.alert("Could not open mail!", "Reach us at kontakt@login.no"))
            }}
        >
            kontakt@login.no
        </Text>
        <Text/>{Space(12)}
    </View>
    )
}

/**
 * Function for displaying the copyright info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Copyright view
 */
export function Copyright() {

    const { lang  } = useSelector( (state: ReduxState) => state.lang)
    const { theme } = useSelector( (state: ReduxState) => state.theme)

    return (
        <View>
            <Text style={{...T.copyright, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                {lang 
                    ? "Opphavsrett © 2022-2023 Login - Linjeforeningen for IT, NO 811 940 372"
                    : "Copyright © 2022-2023 Login - Linjeforeningen for IT, NO 811 940 372"
                }
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

// TODO: Move this to a seperate file. Use object and a .ts file since it does
// not include any React elements.
/**
 * Function for returning the cdn string for each board member.
 *
 * @param {string} verv
 * @returns cdn link as string
 */
function personInfo({person, lang}: personInfoProps) {

    let p = person.toLowerCase()

    const titleNO = {
        leader: "Leader",
        coleader: "Deputy chairwoman",
        secretary: "Secretary",
        evntkom: "EvntKom leader",
        bedkom: "BedKom leder",
        tekkom: "TekKom leder",
        ctf: "CTFkom leader",
        satkom: "SatKom leader",
        pr: "PR leader"
    }

    const titleEN = {
        leader: "Leder",
        coleader: "Nestleder",
        secretary: "Sekretær",
        evntkom: "EvntKom leder",
        bedkom: "BedKom leader",
        tekkom: "TekKom leader",
        ctf: "CTFkom leder",
        satkom: "SatKom leder",
        pr: "PR leader"
    }

    const title = lang ? titleNO : titleEN

    let leader = {
        title: title.leader,
        name: "Tormod Mork Müller",
        tag: "backsiide",
        dclink: "https://discordapp.com/users/210124409816612876",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_leder.jpg`
    }

    let coleader = {
        title: title.coleader,
        name: "Kristina Kataki",
        tag: "Kataki#7254",
        dclink: "https://discordapp.com/users/877108421772582962",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_nestleder.jpg`,
    }

    let secretary = {
        title: title.secretary,
        name: "Aleksander Aaboen",
        tag: "aleksanderaa#2130",
        dclink: "https://discordapp.com/users/610784035777544202",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_sekret%C3%A6r.jpg`,
    }

    let eventkom_leader = {
        title: title.evntkom,
        name: "Sander Hauge",
        tag: "sandiss",
        dclink: "https://discordapp.com/users/171972901501796352",
        img: `https://cdn.login.no/img/portraits/portrett_eventkom-leder.jpg`,
    }

    let bedkom_leader = {
        title: title.bedkom,
        name: "Ida Førland",
        tag: "idaforland",
        dclink: "https://discordapp.com/users/470279697465606159",
        img: `https://cdn.login.no/img/portraits/portrett_pr-leder.jpg`
    }

    let tekkom_leader = {
        title: title.tekkom,
        name: "Eirik Hanasand",
        tag: "eirikhanasand",
        dclink: "https://discordapp.com/users/376827396764073997",
        img: `https://cdn.login.no/img/portraits/portrett_tekkom-leder.jpg`,
    }

    let ctfkom_leader = {
        title: title.ctf,
        name: "Eskil Refsgaard",
        tag: "rrefsgaard",
        dclink: "https://discordapp.com/users/522483274933731331",
        img: `https://cdn.login.no/img/portraits/portrett_ctfkom-leder.jpg`,
    }

    let satkom_leader = {
        title: title.satkom,
        name: "Trygve Sollund",
        tag: "spikeupine",
        dclink: "https://discordapp.com/users/209395476288634881",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_%C3%B8konomi.jpg`
    }

    let pr_leader = {
        title: title.pr,
        name: "Bjørn Kristian Strand",
        tag: "bk_suup",
        dclink: "https://discordapp.com/users/353992260507140097",
        img: `https://cdn.login.no/img/portraits/portrett_placeholder.jpg`
    }

    switch (p) {
        case "leader":      return leader
        case "coleader":    return coleader
        case "secretary":   return secretary
        case "evntkom":     return eventkom_leader
        case "pr":          return pr_leader
        case "ctf":         return ctfkom_leader
        case "eco":         return satkom_leader
        case "bedkom":      return bedkom_leader
        default:            return tekkom_leader
    }
}

export function StaticImage({item}: {item: EventProps}): JSX.Element {
    let image = null

    const images = {
        tekkom:  require(`../../../public/assets/committee/tekkom/tekkom.png`),
        ctf:     require(`../../../public/assets/committee/ctfkom/ctf.png`),
        social:  require(`../../../public/assets/categories/sosialt.png`),
        login:   require(`../../../public/assets/categories/login.png`),
        annet:   require(`../../../public/assets/categories/annet.png`),
        bedpres: require(`../../../public/assets/categories/bedpresBig.png`)
    }

    switch (item.category) {
        case "TEKKOM":  image = images.tekkom;  break
        case "CTF":     image = images.ctf;     break
        case "SOCIAL":  image = images.social;  break
        case "LOGIN":   image = images.login;   break
        case "BEDPRES": image = images.bedpres; break
        default:        image = images.annet;   break
    }

    return <Image style={ES.specificEventImage} source={image} />
}
