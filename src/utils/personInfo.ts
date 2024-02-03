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