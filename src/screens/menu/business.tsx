import { Text, View, ScrollView, Dimensions } from "react-native"
import Space, { Line } from "@shared/components/utils"
import Paragraph from "@shared/components/paragraph"
import { Kontakt } from "@shared/functions/social"
import Cluster from "@shared/functions/cluster"
import en from "@text/en/companiesPage.json"
import no from "@text/nb/companiesPage.json"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import TopMenu from "@shared/topMenu"
import { T } from "@styles/text"
import { ScreenProps } from "@interfaces"
import React from "react"

export default function BusinessScreen( { navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const info = lang ? no.companies : en.companies
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

    const logo = {
        bedpres: isDark
            ? require("@assets/committee/eventkom/bedpres-white.png")
            : require("@assets/committee/eventkom/bedpres-black.png"),
        pr: isDark
            ? require("@assets/committee/prkom/pr-white.png")
            : require("@assets/committee/prkom/pr-black.png"),
        ctf: isDark
            ? require("@assets/committee/ctfkom/ctfkom-white.png")
            : require("@assets/committee/ctfkom/ctfkom-black.png"),
        workshop: isDark
            ? require("@assets/committee/eventkom/workshop.png")
            : require("@assets/committee/eventkom/workshop-black.png"),
        profiling: isDark
            ? require("@assets/committee/eventkom/utlysning.png")
            : require("@assets/committee/eventkom/utlysning-black.png")
    }

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>

        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get("window").height/8.1)}
          <Cluster>
            <Text style={{...T.bold40, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info.title}</Text>{Space(5)}

            {Space(10)}

            <View style={GS.row}>
                <Text>{Line({height: 60, width: 5})}</Text>
                <View>
                <Text style={{...T.boldWithLine, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                    {lang 
                        ? "Er din bedrift på utskikk etter skarpe IT-studenter? Sjekk ut alt vi har å tilby din bedrift."
                        : "Is your company looking for sharp IT students? Check out everything we have to offer your company."
                    }
                </Text>
                </View>
            </View>

            {Space(10)}

            <Paragraph 
                logo={logo.bedpres}
                title={info.bedpres.title}
                body={info.bedpres.body}
            />
            <Paragraph 
                logo={logo.pr}
                title={info.cyberdays.title}
                body={info.cyberdays.body}
            />
            <Paragraph
                logo={logo.ctf}
                title={info.ctf.title}
                body={info.ctf.body}
            />
            <Paragraph 
                logo={logo.workshop}
                title={info.workshop.title}
                body={info.workshop.body}
            />
            <Paragraph 
                logo={logo.profiling}
                title={info.profiling.title}
                body={info.profiling.body}
            />

            {Space(10)}

            <Kontakt/>
          </Cluster>

          {Space(10)}
          {Space(Dimensions.get("window").height/3)}
        </ScrollView>

        </View>
        <TopMenu 
            navigation={navigation} 
            screen="business" 
            title={info.title}
            back={"MenuScreen"}
        />
    </View>
  )
}