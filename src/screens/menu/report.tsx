import GreenLight, { RedLight } from "@/components/shared/light"
import { CardSmaller } from "@/components/shared/card"
import Check from "@components/event/check"
import Button from "@/components/shared/button"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import { ScreenProps } from "@interfaces"
import SS from "@styles/settingStyles"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import no from "@text/menu/report/no.json"
import en from "@text/menu/report/en.json"
import React, { useState } from "react"
import T from "@styles/text"
import { ClusterSmaller } from "@/components/shared/cluster"
import {
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Alert,
    View,
    Text,
} from "react-native"
import Swipe from "@components/nav/swipe"

export default function ReportScreen({ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const text = lang ? no : en
    function sendForm() {
        if (data.name === data.name) {
            // Takk for beskjed. / Thanks for letting us know.
            Alert.alert(text.soon, text.temp)
        } else {
            Alert.alert(text.alert)
        }
    }

    const [data, setData] = useState({
        name: "",
        contact: "",
        content: "",
        check_nameInputChange: false,
        check_contactInputChange: false,
        check_contentInputChange: false,
    })

    function inputName(val: string) {
        if (val.length > 1) {
            setData({
            ...data,
            name: val,
            check_nameInputChange: true
            })
        } else {
            setData({
            ...data,
            name: val,
            check_nameInputChange: false
            })
        }
    }

    function inputContact(val: string) {
        if (val.length > 1) {
            setData({
            ...data,
            contact: val,
            check_contactInputChange: true
            })
        } else {
            setData({
            ...data,
            content: val,
            check_contactInputChange: false
            })
        }
    }

    function inputContent(val: string) {
        if (val.length > 20) {
            setData({
            ...data,
            content: val,
            check_contentInputChange: true
            })
        } else {
            setData({
            ...data,
            content: val,
            check_contentInputChange: false
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Swipe left="MenuScreen">
                <View>
                    <View style={{
                        ...GS.content, 
                        backgroundColor: FetchColor({theme, variable: "DARKER"})
                    }}>
                    <View>
                    <Space height={Dimensions.get("window").height / 8.1 + 40} />
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{text.secure}</Text>
                        <Space height={30} />

                        <View style={SS.loginView}>
                            <ClusterSmaller>
                                <View style={SS.loginView}>
                                    <TextInput
                                        style={{
                                            ...GS.inputText, 
                                            backgroundColor: FetchColor({theme, variable: "DARKER"}), 
                                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                                        }}
                                        placeholder = {text.contact}
                                        placeholderTextColor={FetchColor({theme, variable: "TITLETEXTCOLOR"})}
                                        textAlign="center"
                                        onChangeText={(val) => inputName(val)}
                                        selectionColor={FetchColor({theme, variable: "ORANGE"})}
                                    />
                                    {data.check_nameInputChange ?
                                        <View>
                                            <View style = {SS.greenLight}><GreenLight/></View>
                                            <View style = {SS.checkContent}><Check/></View>
                                        </View>
                                    :
                                        <View>
                                            <View style = {SS.greenLight}><RedLight/></View>
                                            <View style = {SS.checkContent}><Check/></View>
                                        </View>
                                    }
                                </View>
                            </ClusterSmaller>
                            </View>

                            <Space height={20} />
                            <View style={SS.loginView}>
                            <CardSmaller>
                                <View style={SS.loginView}>
                                <TextInput
                                style={{
                                    ...GS.inputText, 
                                    backgroundColor: FetchColor({theme, variable: "DARKER"}), 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}
                                placeholder = {text.who}
                                placeholderTextColor={
                                    FetchColor({theme, variable: "TITLETEXTCOLOR"})
                                }
                                textAlign="center"
                                onChangeText={(val) => inputContact(val)}
                                selectionColor={FetchColor({theme, variable: "ORANGE"})}
                                />
                                    {data.check_contactInputChange ?
                                <View>
                                <View style = {SS.greenLight}><GreenLight/></View>
                                <View style = {SS.checkContent}><Check/></View>
                                </View>
                                :
                                <View>
                                <View style = {SS.greenLight}><RedLight/></View>
                                <View style = {SS.checkContent}><Check/></View>
                                </View>
                                }
                                </View>
                            </CardSmaller>
                            </View>

                            <Space height={20} />

                            <View style={SS.reportContentView}>
                                <CardSmaller>
                                <View style={SS.reportContentView}>
                                    <TextInput
                                    multiline={true}
                                    style={{...GS.reportInputContentText, color: FetchColor({theme, variable: "TEXTCOLOR"})}}
                                    placeholder = {text.what}
                                    placeholderTextColor={FetchColor({theme, variable: "TITLETEXTCOLOR"})}
                                        textAlign="center"
                                        onChangeText={(val) => inputContent(val)}
                                        selectionColor={FetchColor({theme, variable: "ORANGE"})}
                                    />
                                    {data.check_contentInputChange ?
                                        <View>
                                            <View style = {SS.reportGreenLight}>
                                                <GreenLight/>
                                            </View>
                                            <View style = {SS.reportCheckContent}>
                                                <Check/>
                                            </View>
                                        </View>
                                    :
                                        <View>
                                            <View style = {SS.reportGreenLight}>
                                                <RedLight/>
                                            </View>
                                            <View style = {SS.reportCheckContent}>
                                                <Check/>
                                            </View>
                                        </View>
                                    }
                                </View>
                                </CardSmaller>
                            </View>

                            <View>
                            <Space height={40} />
                            <TouchableOpacity
                                disabled ={!data.check_contentInputChange}
                                onPress={() => sendForm()}
                            >
                                <Button>
                                    <Text style={{
                                        ...T.centered20, 
                                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                                    }}>
                                        {text.send}
                                    </Text>
                                </Button>
                            </TouchableOpacity>
                            <Space height={20} />
                            </View>
                        </View>
                        <Space height={Dimensions.get("window").height/10} />
                    </View>
                </View>
            </Swipe>
        </TouchableWithoutFeedback>
        )
}
