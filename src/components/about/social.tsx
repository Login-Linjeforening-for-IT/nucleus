import CornerSquare from "@/components/about/cornerSquare"
import ES from "@styles/eventStyles"
import GS from "@styles/globalStyles"
import Link, { TextLink } from "@components/shared/link"
import T from "@styles/text"
import React from "react"
import { useSelector } from "react-redux"
import { random } from "@/components/shared/utils"
import {
    Image,
    ImageSourcePropType,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

type PersonProps = {
    person: string
}

type MediaLogoProps = {
    link: string
    logo: ImageSourcePropType
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
        <View style={{
            flexDirection: "row", 
            justifyContent: "center", 
            marginTop: 10
        }}>
            {Object.entries(media).map(([link], index) => (
                <MediaLogo 
                    key={link} 
                    link={link} 
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
                source={{uri: "https://cdn.login.no/img/styret2.jpg"}}
            />
            <CornerSquare corner={corner} type={true} />
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
            <Text style={{...T.centeredBold25, color: color}}>{info.contact}</Text>
            <Text style={{...T.centered15, color: color}}>{info.name}</Text>
            <Text style={{...T.centered15, color: color}}>{info.address}</Text>
            <Text style={{...T.centered15, color: color}}>{info.location}</Text>
            <Text style={{...T.centered15, color: color}}>{info.post}</Text>
            <TextLink 
                url="mailto:kontakt@login.no"
                text="kontakt@login.no" 
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
            <Text style={{...T.copyright, color: theme.textColor}}>
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

    const leader = {
        title: title.leader,
        name: "Tormod Mork Müller",
        tag: "backsiide",
        dclink: "https://discordapp.com/users/210124409816612876",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_leder.jpg`
    }

    const coleader = {
        title: title.coleader,
        name: "Kristina Kataki",
        tag: "Kataki#7254",
        dclink: "https://discordapp.com/users/877108421772582962",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_nestleder.jpg`,
    }

    const secretary = {
        title: title.secretary,
        name: "Aleksander Aaboen",
        tag: "aleksanderaa#2130",
        dclink: "https://discordapp.com/users/610784035777544202",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_sekret%C3%A6r.jpg`,
    }

    const eventkom_leader = {
        title: title.evntkom,
        name: "Sander Hauge",
        tag: "sandiss",
        dclink: "https://discordapp.com/users/171972901501796352",
        img: `https://cdn.login.no/img/portraits/portrett_eventkom-leder.jpg`,
    }

    const bedkom_leader = {
        title: title.bedkom,
        name: "Ida Førland",
        tag: "idaforland",
        dclink: "https://discordapp.com/users/470279697465606159",
        img: `https://cdn.login.no/img/portraits/portrett_bedkom-leder.jpg`
    }

    const tekkom_leader = {
        title: title.tekkom,
        name: "Eirik Hanasand",
        tag: "eirikhanasand",
        dclink: "https://discordapp.com/users/376827396764073997",
        img: `https://cdn.login.no/img/portraits/portrett_tekkom-leder.jpg`,
    }

    const ctfkom_leader = {
        title: title.ctf,
        name: "Eskil Refsgaard",
        tag: "rrefsgaard",
        dclink: "https://discordapp.com/users/522483274933731331",
        img: `https://cdn.login.no/img/portraits/portrett_ctfkom-leder.jpg`,
    }

    const satkom_leader = {
        title: title.satkom,
        name: "Trygve Sollund",
        tag: "spikeupine",
        dclink: "https://discordapp.com/users/209395476288634881",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_%C3%B8konomi.jpg`
    }

    const pr_leader = {
        title: title.pr,
        name: "Bjørn Kristian Strand",
        tag: "bk_suup",
        dclink: "https://discordapp.com/users/353992260507140097",
        img: `https://cdn.login.no/img/portraits/portrett_pr-leder.jpg`
    }

    switch (person.toLowerCase()) {
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

export function StaticImage({event}: {event: EventProps}): JSX.Element {
    const images: Record<string, ImageSourcePropType> = {
        tekkom:  require(`../../../public/assets/committee/tekkom/tekkom.png`),
        ctf:     require(`../../../public/assets/committee/ctfkom/ctf.png`),
        bedpres: require(`../../../public/assets/committee/bedkom/bedkom.png`),
        social:  require(`../../../public/assets/categories/sosialt.png`),
        login:   require(`../../../public/assets/categories/login.png`),
        annet:   require(`../../../public/assets/categories/annet.png`),
    }

    const image = images[event.category_name_no.toUpperCase()] || images.annet;

    return <Image style={ES.specificEventImage} source={image} />
}
