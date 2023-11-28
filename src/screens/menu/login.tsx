import GreenLight, { RedLight } from "@/components/shared/light"
import { changeLoginStatus } from "@redux/loginStatus"
import { useSelector, useDispatch } from "react-redux"
import Check from "@components/event/check"
import Cluster from "@/components/shared/cluster"
import Button from "@/components/shared/button"
import Space from "@/components/shared/utils"

import SS from "@styles/settingStyles"
import GS from "@styles/globalStyles"
import React, { useState } from "react"
import { ScreenProps } from "@interfaces"
import T from "@styles/text"
import Swipe from "@components/nav/swipe"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert,
} from "react-native"

type UsernameUIProps = {
    data: DataProps
    inputName: (val: string) => void
}

type DataProps = {
    name: string
    pass: string
    check_textInputChange: boolean
    check_passInputChange: boolean
    secureTextEntry: boolean
}

type InputProps = {
    inputName: (val: string) => void
    data: DataProps
}

type PasswordUIProps = {
    data: DataProps
    inputPass: (val: string) => void
    showPass: () => void
}

export default function LoginScreen({ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { login } = useSelector((state: ReduxState) => state.login)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const dispatch = useDispatch()

    function internalPage() {
        if (data.name === database.name && data.pass === database.pass) {
            dispatch(changeLoginStatus())
            navigation.navigate("InternalScreen")
        } else {
            Alert.alert("Feil brukernavn eller passord")
        }
    }

    const [data, setData] = useState({
        name: "",
        pass: "",
        check_textInputChange: false,
        check_passInputChange: false,
        secureTextEntry: true
    })

    const database = {
        name: "admin",
        pass: "admin"
    }

    function inputName (val: string) {
        if (val.length > 0) {
            setData({...data, name: val, check_textInputChange: true})
        } else {
            setData({...data, name: val, check_textInputChange: false})
        }
    }

    function inputPass (val: string) {
        if (val.length > 0) {
            setData({...data, pass: val, check_passInputChange: true})
        } else {
            setData({...data, check_passInputChange: false})
        }
    }

    function showPass() {
        setData({...data, secureTextEntry: !data.secureTextEntry})
    }

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{...GS.content, backgroundColor: theme.darker}}>
                    <Space height={Dimensions.get("window").height / 8.1} /> 
                    <View>
                        <Space height={80} /> 
                        <Text style={{...T.centered50, color: theme.textColor}}>
                            {lang ? "Innsida" : "Intranet"}
                        </Text>
                        
                        <Space height={20} /> 
                        <UsernameUI data={data} inputName={inputName} />
                        <Space height={10} /> 

                        <PasswordUI
                            data={data}
                            inputPass={inputPass}
                            showPass={showPass}
                        />
                        <View>
                            <Space height={20} /> 
                            <TouchableOpacity
                                disabled ={!data.name || !data.pass}
                            onPress={() => internalPage()}>
                                <Button>
                                    <Text style={{
                                        ...T.centered20, 
                                        color: theme.textColor
                                    }}>
                                        LOGIN
                                    </Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                        <Space height={40} /> 
                        <View>
                            <Image 
                                style={GS.smallImage} 
                                source={require("@assets/logo/loginText.png")}
                            />
                        </View>
                    </View>
                    <Space height={Dimensions.get("window").height / 3} /> 
                </View>
            </View>
        </Swipe>
    )
}

function UsernameUI({data, inputName}: UsernameUIProps):
JSX.Element {
    return (
        <View style={SS.loginView}>
            <Cluster>
                <UsernameInput inputName={inputName} data={data} />
            </Cluster>
        </View>
    )
}

function UsernameInput({inputName, data}: InputProps): 
JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    return (
        <View style={SS.loginView}>
            <TextInput
                style={{
                    ...GS.inputText,
                    backgroundColor: theme.darker,
                    color: theme.textColor
                }}
                placeholder={lang 
                    ? "     brukernavn"
                    : "     username"
                }
                placeholderTextColor={"#555"}
                textAlign="center"
                onChangeText={(val) => inputName(val)}
                selectionColor={theme.orange}
                />
            {data.check_textInputChange ?
                <View>
                    <View style={SS.greenLight}><GreenLight/></View>
                    <View style={SS.checkContent}><Check/></View>
                </View>
            :
                <View>
                <View style={SS.greenLight}><RedLight/></View>
                <View style={SS.checkContent}><Check/></View>
                </View>
            }
        </View>
    )
}

function PasswordUI({data, inputPass, showPass}: PasswordUIProps): 
JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    return (
        <View style={SS.loginView}>
            <Cluster>
                <View style={SS.loginView}>
                <TextInput
                    style={{
                        ...GS.inputText,
                        backgroundColor: theme.darker,
                        color: theme.textColor
                    }}
                    placeholder={lang ? "passord" : "password"}
                    placeholderTextColor={"#555"}
                    secureTextEntry = {data.secureTextEntry ? true : false}
                    textAlign="center"
                    onChangeText={(val) => inputPass(val)}
                    selectionColor={theme.orange}
                />
                {data.check_passInputChange ?
                    <TouchableOpacity onPress={showPass}>
                    {data.secureTextEntry ?
                        <View>
                            <View style = {SS.passLight}><GreenLight/></View>
                            <View style = {{...SS.passCheck}}>
                                <Image 
                                    style={SS.showPassImage} 
                                    source={require("@assets/icons/eyeF.png")}
                                />
                            </View>
                        </View>
                    :
                        <View>
                            <View style = {SS.passLight}><RedLight/></View>
                            <View style = {{...SS.passCheck}}>
                                <Image 
                                    style={SS.showPassImage} 
                                    source={require("@assets/icons/eyeT.png")}
                                />
                            </View>
                        </View>
                    }

                    </TouchableOpacity>
                :
                <View>
                    <View style = {SS.noPassLight}><RedLight /></View>
                    <View style = {{...SS.noPassCheck}}>
                    <Image 
                        style={SS.noPassImage} 
                        source={require("@assets/icons/eyeF.png")} 
                    />
                    </View>
                </View>
                }

            </View>
        </Cluster>
        </View>
    )
}
