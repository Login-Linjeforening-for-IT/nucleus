import { useSelector } from "react-redux"
import Embed from "@components/event/embed"
import { useContext, useMemo } from "react"
import Markdown from "react-native-markdown-display"
import { EventContext } from "@utils/contextProvider"

export default function Description() {
    const event = useContext(EventContext)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    const content = useMemo(() => {
        if (!(event?.event&&Object.keys(event.event).length)) return null
        const description = lang 
            ? event?.event?.description_no || event?.event?.description_en 
            : event?.event?.description_en || event?.event?.description_no


        const embededEvent = /(\[:\w+\]\(\d+\))/
        const findNumber = /\((\d+)\)/
        const split = description.replace(/\\n/g, '<br>').split(embededEvent)

        return split.map((content, index) => {
            const sliced = content.slice(0, 50000)
            const match = sliced.match(findNumber)
            const number = match ? Number(match[1]) : null
            const markdown = sliced.replace(/<br>/g, '\n').replace(/###/g, '')

            if (!sliced.includes('[:event]') && !sliced.includes('[:jobad]')) {
                return <Markdown key={index} style={{text: {color: '#FFF'}}}>{markdown}</Markdown> 
            }

            return <Embed key={index} id={number} type={sliced.includes('[:event]') ? "event" : "ad"} />
        })
    }, [lang, theme.textColor])

    return content
}
