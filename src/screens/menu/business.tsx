import Cluster from "@/components/shared/cluster"
import en from "@text/menu/companies/en.json"
import no from "@text/menu/companies/no.json"
import Paragraph from "@/components/business/paragraph"
import React from "react"
import Space, { Line } from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import { Kontakt } from "@/components/about/social"
import T from "@styles/text"
import { Text, View, ScrollView, Dimensions } from "react-native"
import { useSelector } from "react-redux"
import Swipe from "@components/nav/swipe"
import { TextWithLinks } from "@components/shared/link"

export default function BusinessScreen(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{...GS.content, backgroundColor: theme.darker}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Space height={Dimensions.get("window").height / 8.1 + 10} /> 
                        <Content />
                        <Space height={Dimensions.get("window").height / 3 + 10} /> 
                        </ScrollView>
                </View>
            </View>
        </Swipe>
    )
}

function Content(): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const info = lang ? no.companies : en.companies
    const color = theme.textColor
    const orange = theme.orange

    const logo = {
        bedpres: isDark
            ? require("@assets/committee/eventkom/bedpres-white.png")
            : require("@assets/committee/eventkom/bedpres-black.png"),
        pr: isDark
            ? require("@assets/committee/bedkom/pr-white.png")
            : require("@assets/committee/bedkom/pr-black.png"),
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

    return (
        <Cluster>
            <Text style={{...T.bold40, color: color}}>
                {info.title}
            </Text>
            <Space height={15} /> 
            <Line width={5}>
                <TextWithLinks 
                    style={{...T.boldWithLine, color: color, lineHeight: 18}} 
                    linkStyle={{...T.boldWithLine, color: orange}} 
                    text={info.intro} 
                />
            </Line>

            <Space height={10} /> 
            
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

            <Space height={10} /> 

            <Kontakt/>
        </Cluster>
    )
}
