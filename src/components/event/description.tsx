import RenderHTML from "react-native-render-html"
import { useSelector } from "react-redux"

export default function Description() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const description = lang ? event.description_no : event.description_en

    if (!description) return null

    return <RenderHTML
        baseStyle={{maxWidth: "100%", color: theme.textColor}}
        contentWidth={0}
        source={{html: lang ? event.description_no : event.description_en}}
    />
}