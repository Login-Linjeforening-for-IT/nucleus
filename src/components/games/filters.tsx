import T from "@styles/text"
import { Dispatch, SetStateAction } from "react"
import { Image, Platform, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

type FiltersProps = {
    mode: number
    school: boolean
    ntnu: boolean
    setMode: Dispatch<SetStateAction<number>>
    setSchool: Dispatch<SetStateAction<boolean>>
    setNTNU: Dispatch<SetStateAction<boolean>>
}

export default function Filters({mode, school, ntnu, setMode, setSchool, setNTNU}: FiltersProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const paddingHorizontal = lang ? 
        Platform.OS === 'ios' ? 15 : 30 : 
        Platform.OS === 'ios' ? 25 : 40

    function handleModeChange(index: number) {
        setMode(index)
    }

    function handleSchoolChange() {
        setSchool(!school)
    }

    function handleNTNUChange() {
        setNTNU(!ntnu)
    }

    return (
        <>
            <View style={{
                flexDirection: 'row', 
                width: '100%', 
                justifyContent: 'space-evenly', 
                maxWidth: '80%', 
                position: 'absolute', 
                borderWidth: 2, 
                borderRadius: 4, 
                top: '5%',
                borderColor: theme.contrast,
                overflow: 'hidden',
            }}>
                <TouchableOpacity 
                    style={{
                        backgroundColor: mode == 0 ? theme.contrast : undefined, 
                        paddingHorizontal, 
                        paddingVertical: 2,
                    }} 
                    onPress={() => handleModeChange(0)}>
                    <Text style={{color: theme.textColor, ...T.text20}}>
                        {lang ? 'Snill' : 'Kind'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        backgroundColor: mode == 1 ? theme.contrast : undefined, 
                        paddingHorizontal, 
                        paddingVertical: 2 
                    }} 
                    onPress={() => handleModeChange(1)}>
                    <Text style={{color: theme.textColor, ...T.text20}}>
                        {lang ? 'Blandet' : 'Mix'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        backgroundColor: mode == 2 ? theme.contrast : undefined, 
                        paddingHorizontal, 
                        paddingVertical: 2 
                    }} 
                    onPress={() => handleModeChange(2)}>
                    <Text style={{color: theme.textColor, ...T.text20}}>
                        {lang ? 'Dristig' : 'Bold'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row', 
                width: '100%', 
                justifyContent: 'space-evenly', 
                maxWidth: '80%', 
                position: 'absolute', 
                borderRadius: 4, 
                top: '18%',
                overflow: 'hidden',
            }}>
                <TouchableOpacity 
                    style={{
                        paddingHorizontal: 10, 
                        paddingVertical: 2 
                    }} 
                    onPress={handleSchoolChange}>
                    <Text style={{color: theme.textColor, ...T.text30}}>
                        🎓
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        paddingHorizontal: 10, 
                        paddingVertical: 2 
                    }} 
                    onPress={handleNTNUChange}>
                    <Image
                        style={{width: 50, height: 50, top: Platform.OS === 'ios' ? -10 : -2.5}} 
                        source={require('@assets/icons/NTNU-black.png')} 
                    />
                </TouchableOpacity>
                {!school && <View style={{
                    position: 'absolute',
                    backgroundColor: 'red', 
                    width: Platform.OS === 'ios' ? 45 : 50, 
                    height: 2,
                    top: Platform.OS === 'ios' ? 17 : 23,
                    marginLeft: Platform.OS === 'ios' ? 4 : 5,
                    transform: [{rotate: '45deg'}],
                }} />}
                {!ntnu && <View style={{
                    position: 'absolute',
                    backgroundColor: 'red', 
                    width: Platform.OS === 'ios' ? 45 : 50, 
                    height: 2,
                    top: Platform.OS === 'ios' ? 17 : 25,
                    right: Platform.OS === 'ios' ? 55 : 81,
                    transform: [{rotate: '45deg'}],
                }} />}
            </View>
        </>
    )
}