/**
 * Function for returning the cdn string for each board member.
 * 
 * @param {string} verv 
 * @returns cdn link as string
 */
export default function personInfo(person, lang) {

    let p = person.toLowerCase();

    let leader = {
        title: lang ? "Leder":"Leader",
        name: 'Tormod Mork Müller',
        tag: 'backsiide',
        dclink: 'https://discordapp.com/users/210124409816612876', 
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_leder.jpg`
    }

    let coleader = {
        title: lang ? "Nestleder":"Deputy chairwoman",
        name: 'Kristina Kataki', 
        tag: 'Kataki#7254', 
        dclink: 'https://discordapp.com/users/877108421772582962',
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_nestleder.jpg`,
    }

    let secretary = {
        title: lang ? "Sekretær":"Secretary",
        name: 'Aleksander Aaboen',
        tag: 'aleksanderaa#2130',
        dclink: 'https://discordapp.com/users/610784035777544202',
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_sekret%C3%A6r.jpg`,
    }

    let eventkom_leader = {
        title: lang ? "EventKom leder":"EventKom leader",
        name: 'Sander Hauge',
        tag: 'sandiss',
        dclink: 'https://discordapp.com/users/171972901501796352',
        img: `https://cdn.login.no/img/portraits/portrett_eventkom-leder.jpg`,
    }

    let bedkom_leader = {
        title: lang ? "BedKom leder":"BedKom leader",
        name: 'Ida Førland',
        tag: 'idaforland',
        dclink: 'https://discordapp.com/users/470279697465606159',
        img: `https://cdn.login.no/img/portraits/portrett_pr-leder.jpg`
    }

    let tekkom_leader = {
        title: lang ? "TekKom leder":"TekKom leader",
        name: 'Eirik Hanasand',
        tag: 'eirikhanasand',
        dclink: 'https://discordapp.com/users/376827396764073997',
        img: `https://cdn.login.no/img/portraits/portrett_tekkom-leder.jpg`,
    }

    let ctfkom_leader = {
        title: lang ? "CTFkom leder":"CTFkom leader",
        name: 'Eskil Refsgaard',
        tag: 'rrefsgaard',
        dclink: 'https://discordapp.com/users/522483274933731331',
        img: `https://cdn.login.no/img/portraits/portrett_ctfkom-leder.jpg`,
    }

    let satkom_leader = {
        title: lang ? "SatKom leder":"SatKom leader",
        name: 'Trygve Sollund',
        tag: 'spikeupine',
        dclink: 'https://discordapp.com/users/209395476288634881',
        img: `https://cdn.login.no/img%2Fportraits%2Fportrett_%C3%B8konomi.jpg`
    }

    let pr_leader = {
        title: lang ? "PR leder":"PR leader",
        name: 'Bjørn Kristian Strand',
        tag: 'bk_suup',
        dclink: 'https://discordapp.com/users/353992260507140097',
        img: `https://cdn.login.no/img/portraits/portrett_placeholder.jpg`
    }

    switch (p) {
        case "leader":
        case "leder":               return leader;
        case "coleader":
        case "nestleder":           return coleader;
        case "sekretær":
        case "sekretaer":
        case "secretary":           return secretary;
        case "eventkom_leader":
        case "evntkom_leader":
        case "eventkom_leder":
        case "evntkom_leder": 
        case "eventkom":
        case "evntkom":             return eventkom_leader;
        case "pr":
        case "pr_leader":
        case "pr_leder":            return pr_leader;
        case "tekkom":
        case "tekkom_leader":
        case "tekkom_leder":        return tekkom_leader;
        case "ctf":
        case "ctfkom":
        case "ctf_leder":
        case "ctf_leader":
        case "ctfkom_leader":
        case "ctfkom_leder":        return ctfkom_leader;
        case "eco":
        case "economy":
        case "satkom":
        case "satkom_leader":
        case "satkom_leder":
        case "okonomi":             return satkom_leader;
        case "bedkom":
        case "bedkom_leder":
        case "bedkom_leader":       return bedkom_leader;
        default:                    console.log(`Invalid personInfo string ${p}`);
    }
}