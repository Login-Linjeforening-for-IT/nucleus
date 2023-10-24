import { Image, View, Text, TouchableOpacity } from "react-native"
import ChangeProfileCard from "@/components/profile/changeProfileCard"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import PS from "@styles/profileStyles"
import React, { useState } from "react"
import T from "@styles/text"
import { useSelector } from "react-redux"

type ProfileElementprops = {
    profile: ProfileProps
}

type SmallProfileImageProps = {
    show: boolean
    profile: ProfileProps
}

type MainProfileInfoProps = {
    show: boolean
    profile: ProfileProps
    year: string
}

/**
 * Function for drawing a very small square of the category of the event
 *
 * @param {string} category    Category of the event, Format: "CATEGORY"
 * @returns                     Small circle of the categories color
 */
export default function Profile({profile} : ProfileElementprops) {
    const [show, setShow] = useState(false)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    let y

    const yearNO = ["1. år", "2. år", "3. år", "4. år", "5. år", "6. år", 
                    "7. år", "8. år", "9. år", "10. år"]

    const yearEN = ["1st. year", "2nd. year", "3rd. year", "4th. year", 
                    "5th. year", "6th. year", "7th. year", "8th. year", 
                    "9th. year", "10th. year"]

    const yearArray = lang ? yearNO : yearEN

    switch (profile.schoolyear) {
        case "1" : y = yearArray[0]; break
        case "2" : y = yearArray[1]; break
        case "3" : y = yearArray[2]; break
        case "4" : y = yearArray[3]; break
        case "5" : y = yearArray[4]; break
        case "6" : y = yearArray[5]; break
        case "7" : y = yearArray[6]; break
        case "8" : y = yearArray[7]; break
        case "9" : y = yearArray[8]; break
        case "10": y = yearArray[9]; break
    }

    const year = y + " "

    function handlePress() {
        setShow(true)
    }

    return (
        <>
            <TouchableOpacity onPress={() => handlePress()}>
                <View style={PS.profileBackground}>
                    <View style={PS.leftTwin}>
                        <SmallProfileImage show={show} profile={profile} />
                    </View>
                    <View style={PS.rightTwin}>
                        <MainProfileInfo 
                            show={show}
                            profile={profile}
                            year={year}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {show && <ChangeProfileCard
                    hide={() => {console.log("hidden"); setShow(false)}}
                    trigger={true}
                />
            }
        </>
        )
}

function SmallProfileImage({show, profile}: SmallProfileImageProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    
    return (
        <View style={PS.smallProfileImageView}>
            {!show &&
                <Image
                    style={PS.midProfileImage}
                    source={profile.image
                        ? {uri: profile.image}
                        : theme === 0 || theme === 2 || theme === 3
                            ? require("@assets/icons/loginperson-white.png")
                            : require("@assets/icons/loginperson-black.png")}
                />
            }
        </View>
    )
}

function MainProfileInfo({show, profile, year}: MainProfileInfoProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    if (!show) return (
        <>
            <Text style={{
                ...T.text20,
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {profile.name}
            </Text>
            <Space height={5} />
            <Text style={{
                ...T.text15,
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                {year + profile.degree}
            </Text>
            <Space height={5} />
            <Text style={{
                ...T.text15,
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                ID: {profile.id} · {profile.joinedevents} {lang 
                    ? "Arrangementer"
                    : "Events"}
            </Text>
        </>
    )
}
