import RenderHTML from "react-native-render-html"
import { useSelector } from "react-redux"
import Embed from "@components/event/embed"
import { useMemo } from "react"

export default function Description() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    const content = useMemo(() => {
        if (!(event&&Object.keys(event).length)) return null
        const description = lang ? event?.event?.description_no || event?.event?.description_en : event?.event?.description_en || event?.event?.description_no


        const embededEvent = /(\[:\w+\]\(\d+\))/
        const findNumber = /\((\d+)\)/
        const split = description.replace(/\\n/g, '<br>').split(embededEvent)

        return split.map((content, index) => {
            const match = content.match(findNumber)
            const number = match ? Number(match[1]) : null

            if (!content.includes('[:event]') && !content.includes('[:jobad]')) {
                return <RenderHTML
                    key={index}
                    baseStyle={{color: theme.textColor}}
                    contentWidth={10}
                    source={{html: content}}
                    // defaultTextProps={{selectable: true}}
                />
            }

            return <Embed key={index} id={number} type={content.includes('[:event]') ? "event" : "ad"} />
        })
    }, [lang, event.description_no, event.description_en, theme.textColor])

    return content
}
