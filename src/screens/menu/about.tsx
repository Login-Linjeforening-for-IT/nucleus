import Space, { Line } from "@shared/components/utils"
import Dropdown from "@shared/functions/dropdown"
import Cluster from "@shared/functions/cluster"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import en from "@text/en/aboutPage.json"
import no from "@text/nb/aboutPage.json"
import TopMenu from "@shared/topMenu"
import React, {useState} from "react"
import { T } from "@styles/text"
import { ScreenProps } from "@interfaces"
import person, { 
    AllComitees, 
    Social, 
    styret, 
    Copyright
} from "@shared/functions/social"
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    Dimensions,
} from "react-native"

type getCommitteeImageProps = {
    style: string
    id: number
}

type CommitteePersonProps = {
    committee: number
    lang: boolean
    theme: number
}

type CommitteeImageTouchableProps = {
    setCommittee: React.Dispatch<React.SetStateAction<number>>
    committee: number
    isDark: boolean
    theme: number
    index: number
}

type CommitteeViewProps = {
    setCommittee: React.Dispatch<React.SetStateAction<number>>
    committee: number
    isDark: boolean
    theme: number
}

export default function AboutScreen( { navigation }: ScreenProps): JSX.Element {
    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { login } = useSelector( (state: ReduxState) => state.login )
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const screenWidth = Dimensions.get("window").width
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false
    const [committee, setCommittee] = useState(0)

  const info = [
    {id: 0, titleNO: "Styret",   titleEN: "Board",    quoteNO: "", qouteEN: "", descriptionNO: "Øverste leddet i foreningen er styret. Under årsmøtet blir leder, nestleder og sekretær stemt frem, og disse sitter sammen med lederene fra de ulike komiteene i styret. Sammen er disse ansvarlige for å drive foreningen, styre økonomien og sørge for at alle utfører de oppgavene de skal.", descriptionEN: "The highest level of the association is the board. During the annual meeting, the chairman, deputy chairman and secretary are voted in, and these sit together with the leaders from the various committees on the board. Together, these are responsible for running the association, managing the finances and ensuring that everyone performs the tasks they are supposed to."},
    {id: 1, titleNO: "EventKom", titleEN: "EventKom", quoteNO: "EventKom er Logins party-komité hvor målet er å bruke opp alle inntektene PR sørger for.", qouteEN: "EventKom is Login's party committee, where the goal is to use up all the income PR provides.", descriptionNO: "EventKom har ansvar for å stelle i stand sosiale arrangement på vegne av Login gjennom semesteret. Vi tilbyr sammenkomster der studenter kan møtes på tvers av studieprogram, år og klasser for å få et avbrekk fra studiehverdagen. Målet til EventKom er å bygge et sterkt fellesskap blant IT-studentene ved skolen, som du kan lene deg på når studiehverdagen tar på. Dersom du har forslag til aktiviteter, eller ønsker å være med i komiteen er det bare å kontakte oss på Discord. Forslag og tilbakemeldinger tas imot med glede, og vi håper å høre fra deg.", descriptionEN: "EventKom is responsible for setting up social events on behalf of Login throughout the semester. We offer gatherings where students can meet across study programmes, years and classes in order to have a break from everyday study life. The aim of EventKom is to build a strong community among the IT students at the school, which you can lean on when the study life gets busy. If you have suggestions for activities, or want to join the committee, just contact us on Discord. Suggestions and feedback are welcomed, and we hope to hear from you."},
    {id: 2, titleNO: "TekKom",   titleEN: "TekKom",   quoteNO: "TekKom påstår at de jobber med nettsiden men hovedsaklig spiser de pizza. Dette er komiteen for de som liker å lære tekniske ting som å progge og drifte høyteknologisk infrastruktur.", qouteEN: "TekKom claim that they work on this app and their website, but they mainly eat pizza. This is the committee for those who like to learn technical things such as programming and operating high-tech infrastructure.", descriptionNO: "TekKom har ansvaret for infrastrukturen til Login. Våre oppgaver innebærer utvikling og vedlikehold av blant annet nettsidene og tjenestene foreningen avhenger av, i tillegg til andre sideprosjekter. Vi organiserer åpne arbeidskvelder med pizza hver uke der vi jobber med TekKom-prosjekter. Her stiller vi ingen forventninger annet enn at man er nysgjerrig og forøker å bidra med det man kan. Hvis du liker å kode, eller bare har et vilt prosjekt i tankene, så er dette komiteen for deg!", descriptionEN: "TekKom is responsible for Login's infrastructure. Our tasks involve development and maintenance of, among other things, the websites and services the association depends on, in addition to other side projects. We organize open work evenings with pizza every week where we work on TekKom projects. Here we set no expectations other than that you are curious and try to contribute what you can. If you enjoy coding, or just have a wild project in mind, this is the committee for you!"},
    {id: 3, titleNO: "PR",       titleEN: "PR",       quoteNO: "PR er Logins gyldne ku og uten dem hadde ikke pengene strømmet inn og ingen av de andre komiteene kunne drevet med sprell!", qouteEN: "PR is Login's golden calf and without them the money wouldn't have flowed in and none of the other committees could do the trick!", descriptionNO: "PR er Logins ansikt utad og har ansvar for Logins offentlige mediakanaler. PR følger med på vårt ticketsystem og svarer bedriftskontakter. De jobber også for å gi studenter et innsyn og vei inn i næringslivet ved å arrangere bedpreser, workshops/fagpres og karrieredager, som også er Logins hovedinntektskilde! Videre er PR med på å representere Login på events og bistår også med rekruttering av nye medlemmer.", descriptionEN: "PR is Login's public face and is responsible for Login's social media channels. PR monitors our ticket system and responds to company contacts. They also work to give students a sneak peek into the business world, by arranging company presentations and a career fair called The Cyberdays each semester. Furthermore, PR helps to represent Login at events and also assists with the recruitment of new members."},
    {id: 4, titleNO: "CTFkom",   titleEN: "CTFkom",   quoteNO: "CTFkom er Logins hacker-komité. Deres viktigste oppdrag er å hacke seg inn på ING:α sin infrastruktur og lage sprell der!", qouteEN: "CTFkom is Login's hacker committee. Their most important mission is to hack into ING:α's infrastructure and create havoc!", descriptionNO: "CTFKom er komiteen som stiller i stand CTF arrangementer på campus. De arbeider for at alle IT- studentene ved skolen skal kunne utvikle sine ferdigheter gjennom Capture The Flag konkurranser. Annenhver uke samles de på skolen for å løse oppgaver sammen, og tilbyr en arena der studenter fra ulike studieprogram, år og klasser kan treffes og ha det gøy sammen. Utover dette er vi aktive på Discord, og sørger for at du alltid kan holde deg oppdatert på nye og interessante CTFer. I CTFkom er ingen spørsmål for dumme og dersom du sitter fast i en CTF, eller bare lurer på noe er det bare å sende en melding i kanalen på Discord.", descriptionEN: "CTFkom is the committee that organizes CTF events on campus. They work to ensure that all IT students at the school can develop their skills through Capture The Flag competitions. Every other week they gather at the school to solve tasks together and offer an arena where students from different study programmes, years and classes can meet and have fun together. In addition to this, we are active on Discord, and ensure that you can always stay up to date on new and interesting CTFs. In CTFkom, no question is too stupid and if you are stuck in a CTF, or just wondering about something, just send a message in the channel on Discord."},
    {id: 5, titleNO: "SATkom",   titleEN: "SATkom",   quoteNO: "SATkom er komiteen som vokter Login sin pengebinge, og sørger for at pengene både flyter inn og ut. Hvis du har økonomisk sans, eller bare vil bli Login's nye sugar daddy, så er dette komiteen for deg!", qouteEN: "SATkom is the committee that guards Login's money bin and ensures that the money flows both in and out. If you have financial skills, or just want to be Login's new sugar daddy, then this is the committee for you!", descriptionNO: "SATkom står for Sytematiserte Automatiserte Transaksjoner, og de jobber med å forvalte midlene Login har tilgengelig. Deres oppgaver innebærer betaling av regninger, utsending av fakturaer og innkjøp til foreningen. De lager ukentlige regnskap, og passer på at komiteene ikke overskrider budsjettene for mye. Komiteen har også en \"Dungeon Master\" som har i oppgave å passe på Loungen, og at alle medlemmene våre får nok koffein. Videre er komiteen involvert i budsjettering, diverse økonomiske saker og andre ablegøyer.", descriptionEN: "SATkom stands for Systematized Automated Transactions, and they work with managing the funds Login has available. Their duties involve paying bills, sending out invoices and purchasing for the association. They prepare weekly accounts, and make sure that the committees do not exceed their budgets too much. The committee also has a \"Dungeon Master\" who is tasked with looking after the Lounge, and that all our members get enough caffeine. Furthermore, the committee is involved in budgeting, various financial matters and other minor matters."}
  ]

  return (
  <View>
    <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {Space(Dimensions.get("window").height/8.1)}
            <Cluster>
                <Text style={{...T.bold40, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang ? no.title : en.title}
                </Text>
                {Space(5)}
                <View style={GS.row}>
                    <Text>
                        {lang 
                            ? Line({height: 58, width: 5}) 
                            : screenWidth < 390 
                                ? Line({height: 94, width: 5}) 
                                : Line({height: 92, width: 5})}
                    </Text>
                    <View>
                        <Text style={{...T.boldWithLine, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                            {lang ? no.intro : en.intro}
                        </Text>
                    </View>
                </View>
                {Space(10)}
                <Dropdown/>
                {Space(10)}
                {styret(theme)}
                {Space(15)}
                <Text style={{...T.bold25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang ? no.about.title : en.about.title}
                </Text>
                {Space(10)}
                <View style={GS.row}>
                <Text>{Line({height: 58, width: 5})}</Text>
                <View>
                    <Text style={{...T.boldWithLine, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                        {lang ? no.about.intro : en.about.intro}
                    </Text>
                </View>
                </View>
                {Space(10)}
                <Text style={{...T.paragraph, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang ? no.about.body.p1 : en.about.body.p1 }
                </Text>
                {Space(10)}
                <Text style={{...T.paragraph, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang ? no.about.body.p2 : en.about.body.p2 }
                </Text>
                {Space(15)}
                <Text style={{...T.bold25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang ? no.committeeSection.title : en.committeeSection.title }
                </Text>
                {Space(10)}
                <Text style={{...T.boldParagraph, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang ? no.committeeSection.intro : en.committeeSection.intro }
                </Text>
                {Space(10)}
                <CommitteeView
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                />
                {
                info.map((relevantCommittee, index) => {
                    if (relevantCommittee.id === committee) {
                        return (
                            <View key={index}>
                                <Text style={{...T.text30, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                                <Image 
                                    style={GS.small} 
                                    source={getCommitteeImage({
                                        id: relevantCommittee.id, 
                                        style: isDark ? "dark" : "light"})
                                    }
                                />
                                {lang ? relevantCommittee.titleNO : relevantCommittee.titleEN}</Text>

                                {(relevantCommittee.quoteNO && lang || relevantCommittee.qouteEN && !lang) ? <Text style={{...T.boldParagraph, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? relevantCommittee.quoteNO : relevantCommittee.qouteEN}</Text>:null}
                                {(relevantCommittee.quoteNO && lang || relevantCommittee.qouteEN && !lang) ? Space(10):null}
                                <Text style={{...T.paragraph, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? relevantCommittee.descriptionNO : relevantCommittee.descriptionEN}</Text>
                                {Space(15)}
                            </View>
                        )
                    }
                })
                }

                <CommitteePerson committee={committee} theme={theme} lang={lang }/>

                {Space(10)}
                <Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? no.publicDocs.title : en.publicDocs.title }</Text>
                <View>
                <Text style={{...T.paragraph, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang 
                        ? "For mer informasjon og offentlige dokumenter kan du besøke"
                        : "For more information and public documents, visit"}
                    {<Text 
                        style={T.orange15} 
                        onPress={() => Linking.openURL("https://wiki.login.no")}> {lang ? "wikien":"the wiki"}</Text>}.
                </Text>

                </View>
                {Space(10)}
                <Social/>
                <Copyright/>
            </Cluster>
            {Space(10)}
            {Space(Dimensions.get("window").height/3)}
            </ScrollView>
        </View>
        <TopMenu 
            navigation={navigation}
            screen="about" 
            title={lang ? "Om oss" : "About Login"} 
            back={"MenuScreen"}
        />
    </View>
  )
}

function getCommitteeImage({id, style}: getCommitteeImageProps) {
    const images = [
        {
            selected: require("@assets/committee/styret/styret-orange.png"),
            dark:     require("@assets/committee/styret/styret-black.png"),
            gray:     require("@assets/committee/styret/styret555.png"),
            light:    require("@assets/committee/styret/styret-white.png")
        },
        {
            selected: require("@assets/committee/eventkom/eventkom-orange.png"),
            dark:     require("@assets/committee/eventkom/eventkom-black.png"),
            gray:     require("@assets/committee/eventkom/eventkom555.png"),
            light:    require("@assets/committee/eventkom/eventkom-white.png")
        },
        {
            selected: require("@assets/committee/tekkom/tekkom-orange.png"),
            dark:     require("@assets/committee/tekkom/tekkom-black.png"),
            gray:     require("@assets/committee/tekkom/tekkom555.png"),
            light:    require("@assets/committee/tekkom/tekkom-white.png")
        },
        {
            selected: require("@assets/committee/prkom/pr-orange.png"),
            dark:     require("@assets/committee/prkom/pr-black.png"),
            gray:     require("@assets/committee/prkom/pr555.png"),
            light:    require("@assets/committee/prkom/pr-white.png")
        },
        {
            selected: require("@assets/committee/ctfkom/ctfkom-orange.png"),
            dark:     require("@assets/committee/ctfkom/ctfkom-black.png"),
            gray:     require("@assets/committee/ctfkom/ctfkom555.png"),
            light:    require("@assets/committee/ctfkom/ctfkom-white.png")
        },
        {
            selected: require("@assets/committee/satkom/satkom-orange.png"),
            dark:     require("@assets/committee/satkom/satkom-black.png"),
            gray:     require("@assets/committee/satkom/satkom555.png"),
            light:    require("@assets/committee/satkom/satkom.png")
        }
    ]

    switch (style) {
        case "dark":    return images[id].light
        case "gray":    return images[id].gray
        case "light":   return images[id].dark
        default:        return images[id].selected
    }
}

function CommitteePerson({committee, lang, theme}: CommitteePersonProps) {
    const committees = ["evntkom", "tekkom", "pr", "ctf", "eco"]

    if (committees[committee-1]) {
        return person({person: committees[committee-1], lang, theme})
    } else return AllComitees({lang,theme})
}

function CommitteeView({setCommittee, committee, isDark, theme}: CommitteeViewProps) {
    let elements: JSX.Element[] = []
    
    for (let i = 0; i < 6; i+=3) {
        elements.push(
            <View key={"View" + i} style={GS.parentCommitteeView}>
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                    index={i}
                    />
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                    index={i+1}
                    />
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                    index={i+2}
                    />
            </View>
        )
    }

    return elements
}

function CommitteeImageTouchable({setCommittee, committee, isDark, theme, 
index}: CommitteeImageTouchableProps): JSX.Element {
    const image = committee === index ? "" : isDark ? "dark" : "gray"

    return (
        <TouchableOpacity onPress={() => setCommittee(index)}>
            <View style={{
                ...GS.committee, 
                backgroundColor: FetchColor({theme, variable: "CONTRAST"})
            }}>
                <Image 
                    style={GS.image80} 
                    source={getCommitteeImage({id: index, style: image})}
                />
            </View>
        </TouchableOpacity>
    )
}
