import Markdown from "./markdown"
import { useSelector } from "react-redux"
import InfoBlock from "@components/shared/infoBlock"
import Space from "@components/shared/utils"

export default function ReadOnly({text}: {text: string}) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const textNO = "Dette kurset har ikke flervalgseksamen, og inneholder kun notater. Disse kan foreløpig ikke redigeres på telefon."
    const textEN = "This course does not contain multiple choice questions, and only contains notes. Notes are currently not editable on mobile."
    const info = lang ? textNO : textEN
    const renderableText = text.replace(/<br><\/br>/g, '\n').replace(/<br>/g, '\n')

    return (
        <>
            <InfoBlock text={info} />
            <Markdown text={renderableText} />
            <Space height={120} />
        </>
    )
}