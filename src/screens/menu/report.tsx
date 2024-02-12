import GreenLight, { RedLight } from "@/components/shared/light"
import { CardSmaller } from "@/components/shared/card"
import Check from "@components/event/check"
import Button from "@/components/shared/button"
import Space from "@/components/shared/utils"
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

export default function ReportScreen(): JSX.Element {

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
        setData({
            ...data,
            name: val,
            check_nameInputChange: val.length > 1 ? true : false
        })
    }

    function inputContact(val: string) {
        setData({
            ...data,
            name: val,
            check_contactInputChange: val.length > 1 ? true : false
        })
    }

    function inputContent(val: string) {
        setData({
            ...data,
            content: val,
            check_contentInputChange: val.length > 20 ? true : false
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Swipe left="MenuScreen">
                <View>
                    <View style={{...GS.content, backgroundColor: theme.darker}}>
                    <View>
                    <Space height={Dimensions.get("window").height / 8.1 + 40} />
                        <Text style={{...T.centered, color: theme.textColor}}>{text.secure}</Text>
                        <Space height={30} />

                        <View style={SS.loginView}>
                            <ClusterSmaller>
                                <View style={SS.loginView}>
                                    <TextInput
                                        style={{
                                            ...GS.inputText, 
                                            backgroundColor: theme.darker, 
                                            color: theme.textColor
                                        }}
                                        placeholder = {text.contact}
                                        placeholderTextColor={theme.titleTextColor}
                                        textAlign="center"
                                        onChangeText={(val) => inputName(val)}
                                        selectionColor={theme.orange}
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
                                    backgroundColor: theme.darker, 
                                    color: theme.textColor
                                }}
                                placeholder = {text.who}
                                placeholderTextColor={theme.titleTextColor}
                                textAlign="center"
                                onChangeText={(val) => inputContact(val)}
                                selectionColor={theme.orange}
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
                                        style={{...GS.reportInputContentText, color: theme.textColor}}
                                        placeholder = {text.what}
                                        placeholderTextColor={theme.titleTextColor}
                                        textAlign="center"
                                        onChangeText={(val) => inputContent(val)}
                                        selectionColor={theme.orange}
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

                            <View style={{marginTop: 40, marginBottom: 20}}>
                                <TouchableOpacity
                                    disabled ={!data.check_contentInputChange}
                                    onPress={() => sendForm()}
                                >
                                    <Button>
                                        <Text style={{
                                            ...T.centered20, 
                                            color: theme.textColor
                                        }}>
                                            {text.send}
                                        </Text>
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Space height={Dimensions.get("window").height / 10} />
                    </View>
                </View>
            </Swipe>
        </TouchableWithoutFeedback>
        )
}
