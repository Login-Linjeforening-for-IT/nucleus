import { useEffect } from "react"
import { View, Alert } from "react-native"
import { useSelector } from "react-redux"

export default function ForceUpdate() {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    
    const updateNo = {
        title: "Oppdatering tilgjengelig!", 
        body: "Gode nyheter! En ny oppdatering er tilgjengelig 😃"
    }

    const updateEn = {
        title: "New update available!", 
        body: "Good news! A new update is available 😃"
    }

    const update = lang ? updateNo : updateEn

    function alert() {
        Alert.alert(update.title, update.body)
    }

    useEffect(() => {
        alert()
    }, [])


    return <View style={{backgroundColor: 'black', height: "100%", width: "100%"}} />
}