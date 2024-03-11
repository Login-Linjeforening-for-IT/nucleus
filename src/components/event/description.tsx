import RenderHTML from "react-native-render-html"
import { useSelector } from "react-redux"
import Embed from "@components/event/embed"

export default function Description() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    if (!(event&&Object.keys(event).length)) return null
    const description = lang ? event?.event?.description_no || event?.event?.description_en : event?.event?.description_en || event?.event?.description_no


    const fixedDesc = description.replace(/\\n/g, '<br>')
    const embededEvent = /(\[:\w+\]\(\d+\))/
    const findNumber = /\((\d+)\)/
    const split = fixedDesc.split(embededEvent)
    const color = theme.textColor

    return split.map((content, index) => {
        const match = content.match(findNumber)
        const number = match ? Number(match[1]) : null

        if (!content.includes('[:event]') && !content.includes('[:jobad]')) {
            return <RenderHTML
                key={index}
                baseStyle={{color}}
                contentWidth={10}
                source={{html: content}}
            />
        }

        return <Embed key={index} id={number} type={content.includes('[:event]') ? "event" : "ad"} />
    })
}
