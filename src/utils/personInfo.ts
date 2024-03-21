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
export default function personInfo({person, lang}: personInfoProps) {
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
        name: "Ida Førland",
        tag: "idaforland",
        dclink: "https://discordapp.com/users/470279697465606159",
        img: `https://cdn.login.no/img/portraits/portrett_leder.jpg`
    }

    const coleader = {
        title: title.coleader,
        name: "Kristian Eriksen",
        tag: "kissaer",
        dclink: "https://discordapp.com/users/301619379001491457",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_nestleder.jpg`,
    }

    const secretary = {
        title: title.secretary,
        name: "Sofia Serine Mikkelsen",
        tag: "sofiaserine",
        dclink: "https://discordapp.com/users/616878763010949121",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_sekret%C3%A6r.jpg`,
    }

    const eventkom_leader = {
        title: title.evntkom,
        name: "Sebastian Marterer",
        tag: "coldfridge.",
        dclink: "https://discordapp.com/users/486788989097869314",
        img: `https://cdn.login.no/img/portraits/portrett_eventkom-leder.jpg`,
    }

    const bedkom_leader = {
        title: title.bedkom,
        name: "Lavrans Åsen Felix",
        tag: "james00728",
        dclink: "https://discordapp.com/users/378257251908976640",
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
        name: "Tormod Fjeld Lie",
        tag: "tmod.",
        dclink: "https://discordapp.com/users/841095548890251304",
        img: `https://cdn.login.no/img/portraits/portrett_ctfkom-leder.jpg`,
    }

    const satkom_leader = {
        title: title.satkom,
        name: "Erik Hansen-Tangen Breien",
        tag: "kireb",
        dclink: "https://discordapp.com/users/165972992931790848",
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_%C3%B8konomi.jpg`
    }

    const pr_leader = {
        title: title.pr,
        name: "Marius Nicolai Holte",
        tag: "iamk3v",
        dclink: "https://discordapp.com/users/164311829177171968",
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