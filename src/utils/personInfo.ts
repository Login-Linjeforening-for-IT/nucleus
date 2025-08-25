import { CDN } from "@/constants"

type personInfoProps = {
    person: string
    lang: boolean
}

/**
 * Function for returning the cdn string for each board member.
 *
 * @param {string} verv
 * @returns cdn link as string
 */
export default function personInfo({ person, lang }: personInfoProps) {
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
        name: "Johan Wilvang",
        tag: "johan_w",
        dclink: "https://discordapp.com/users/382587377022926848",
        img: `${CDN}board/portraits/leder.png`
    }

    const coleader = {
        title: title.coleader,
        name: "Sebastian Marterer",
        tag: "coldfridge.",
        dclink: "https://discordapp.com/users/486788989097869314",
        img: `${CDN}board/portraits/nestleder.png`,
    }

    const secretary = {
        title: title.secretary,
        name: "Amanda Nyseth",
        tag: "amandavn05",
        dclink: "https://discordapp.com/users/1273571773463658552",
        img: `${CDN}board/portraits/sekret%C3%A6r.png`,
    }

    const eventkom_leader = {
        title: title.evntkom,
        name: "Peder Gintal",
        tag: "pergintal",
        dclink: "https://discordapp.com/users/249630146678620172",
        img: `${CDN}board/portraits/evntkom_leder.png`,
    }

    const bedkom_leader = {
        title: title.bedkom,
        name: "Daoud Chauhry",
        tag: "dahood081784",
        dclink: "https://discordapp.com/users/428285256467087383",
        img: `${CDN}board/portraits/bedkom_leder.png`
    }

    const tekkom_leader = {
        title: title.tekkom,
        name: "Gjermund H. Pedersen",
        tag: "turtleman02",
        dclink: "https://discordapp.com/users/260370482757500938",
        img: `${CDN}board/portraits/tekkom_leder.png`,
    }

    const ctfkom_leader = {
        title: title.ctf,
        name: "Maja Melby",
        tag: "majam_",
        dclink: "https://discordapp.com/users/1011661501536407552",
        img: `${CDN}board/portraits/ctfkom_leder.png`,
    }

    const satkom_leader = {
        title: title.satkom,
        name: "Sivert Hovemoen",
        tag: "sivsiv01",
        dclink: "https://discordapp.com/users/208903111975239681",
        img: `${CDN}board/portraits/satkom_leder.png`
    }

    const pr_leader = {
        title: title.pr,
        name: "Halvard Holen",
        tag: "cosinus8455",
        dclink: "https://discordapp.com/users/184282867579224064",
        img: `${CDN}board/portraits/pr_leder.png`
    }

    switch (person.toLowerCase()) {
        case "leader": return leader
        case "coleader": return coleader
        case "secretary": return secretary
        case "evntkom": return eventkom_leader
        case "pr": return pr_leader
        case "ctf": return ctfkom_leader
        case "eco": return satkom_leader
        case "bedkom": return bedkom_leader
        default: return tekkom_leader
    }
}