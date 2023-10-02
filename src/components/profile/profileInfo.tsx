import { Image, View, Text, TouchableOpacity } from "react-native"
import ChangeInfoCard from "@/components/profile/changeInfoCard"
import Cluster from "@/components/shared/cluster"
import FetchColor from "@styles/fetchTheme"
import CS from "@styles/clusterStyles"
import PS from "@styles/profileStyles"
import React, { useState } from "react"
import T from "@styles/text"

type ProfileInfoProps = {
    theme: number
    lang: boolean
    profile: ProfileProps
}

type ProfileInfoContentProps = {
    type: string[]
    index: number
    theme: number
    profile: ProfileProps
    selectedIndex: number
}

/**
 * Function for drawing a very small square of the category of the event
 *
 * @param {string} category    Category of the event, Format: "CATEGORY"
 * @returns                     Small circle of the categories color
 */
export default function ProfileInfo({theme, lang, profile}: ProfileInfoProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [previousIndex, setPreviousIndex] = useState(-1)
    const [profileInfo] = useState(profile)
    const profileInfoKeys = Object.keys(profileInfo)

    const typeNO = [ "Studieretning", "Studieår", "Epost", "Preferanser", "Allergier" ]
    const typeEN = ["Degree", "Study year", "Mail", "Preferences", "Allergies" ]
    const type = lang ? typeNO : typeEN

    /**
     * @brief Handles click
     *
     * Handles click of all profileinfo items, and accounts for double clicks by
     * utilizing a previousIndex for cases where the same key is clicked multiple
     * times, for example if the user makes a typo and needs to change the same
     * thing again right away.
     *
     * @param {int} selectedIndex Stores clicked index
     * @param {int} index Index of most recent click
     */
    const handleClick = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(-1)
        } else {
            setSelectedIndex(index)
        }
    }

    return (
        <View>
            {profileInfoKeys.map((key, index) => (
                <View key={key}>
                    <TouchableOpacity onPress={() => handleClick(index)}>
                        <ProfileInfoContent 
                            type={type}
                            index={index}
                            theme={theme}
                            profile={profile}
                            selectedIndex={selectedIndex}
                        />
                    </TouchableOpacity>
                </View>
            ))}
            {typeof selectedIndex === "number" &&
                <ChangeInfoCard
                    theme={theme}
                    lang={lang}
                    type={type[selectedIndex]}
                    value={selectedIndex}
                    hide={() => {
                        setSelectedIndex(-1)
                        setPreviousIndex(-1)}
                    }
                    trigger={true}
                />
            }
        </View>
    )
}

function ProfileInfoContent ({type, index, theme, profile, selectedIndex}: 
ProfileInfoContentProps) {

    return (
        <Cluster noColor={true}>
            <View style={{...CS.clusterBack}}>
                <View style={CS.evenTwinLeft}>
                    <Text style={{
                        ...T.text20,
                        color: FetchColor({theme,
                            variable: "TEXTCOLOR"})
                    }}>
                        {type[index]}
                    </Text>
                </View>
                <View style={CS.evenTwinRight}>
                    <View style={{...CS.twinLeft, top: 6.75, left: -20}}>
                        <Text style={{
                                ...T.text15, textAlign: "right",
                                color: FetchColor({theme,
                                    variable: "OPPOSITETEXTCOLOR"})
                        }}>
                            {index === 0 && profile.degree}
                            {index === 1 && profile.schoolyear}
                            {index === 2 && profile.mail}
                            {index === 3 && profile.preferences}
                            {index === 4 && profile.allergies}
                        </Text>
                    </View>
                    <View style={CS.twinRight}>
                        <Image
                            style={PS.editImage}
                            source={selectedIndex === index
                                ? require("@assets/icons/pencil-orange.png")
                                : require("@assets/icons/pencil777.png")}
                            />
                    </View>
                </View>
            </View>
        </Cluster>
    )
}
