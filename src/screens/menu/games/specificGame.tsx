import { MenuProps } from "@type/screenTypes"
import { useDispatch, useSelector } from "react-redux"
import Parent from "@components/shared/parent"
import { setLocalTitle } from "@redux/misc"
import { useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { 
    getQuestions, 
    getNeverHaveIEver, 
    getOkRedFlagDealbreaker 
} from "@utils/game"
import Swiper from "@components/games/swiper"

type GameProps = {
    game: Question[] | NeverHaveIEver[] | OkRedFlagDealBreaker[]
}

export default function SpecificGameScreen({ route }: MenuProps<"SpecificGameScreen">): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { localTitle } = useSelector((state: ReduxState) => state.misc)
    const [game, setGame] = useState<Question[] | NeverHaveIEver[] | OkRedFlagDealBreaker[] | string>("")
    const dispatch = useDispatch()

    useEffect(() => {
        if (localTitle.screen !== route.params.gameName) {
            dispatch(setLocalTitle({ title: route.params.gameName, screen: "SpecificGameScreen" }));
        }
    }, [localTitle.screen, route.params.gameName, dispatch]);

    async function fetchGame() {
        const game = await determineGame()

        if (game) {
            setGame(game)
            return true
        }
    }

    async function determineGame() {
        switch (route.params.gameID) {
            case 1: return await getNeverHaveIEver()
            case 2: return await getOkRedFlagDealbreaker()
            default: return await getQuestions()
        }
    }

    useEffect(() => {
        (async () => {
           await fetchGame()
        })()
    }, [])

    return (
        <Parent paddingHorizontal={-1} colors={[theme.orange, 'red', theme.orange]}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
                scrollEnabled={false}
            >
            {typeof game === 'string' 
                ? <Text style={{ fontSize: 18, color: theme.textColor }}>{game}</Text> 
                : <Game game={game} />
            }
            </ScrollView>
        </Parent>
    )
}

function Game({game}: GameProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const [mode, setMode] = useState(0)
    const [school, setSchool] = useState(true)
    const [ntnu, setNTNU] = useState(true)
    const paddingHorizontal = lang ? 15 : 25

    function handleModeChange(index: number) {
        setMode(index)
    }

    function handleSchoolChange() {
        setSchool(!school)
    }

    function handleNTNUChange() {
        setNTNU(!ntnu)
    }

    // function to randomize the order of the questions
    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    shuffleArray(game)

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center'}}>
            <Swiper game={game} mode={mode} school={school} ntnu={ntnu} />
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
                    <Text style={{color: theme.textColor, fontSize: 20}}>
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
                    <Text style={{color: theme.textColor, fontSize: 20}}>
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
                    <Text style={{color: theme.textColor, fontSize: 20}}>
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
                    <Text style={{color: theme.textColor, fontSize: 30}}>
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
                        style={{width: 50, height: 50, top: -10}} 
                        source={require('@assets/icons/NTNU-black.png')} 
                    />
                </TouchableOpacity>
                {!school && <View style={{
                    position: 'absolute',
                    backgroundColor: 'red', 
                    width: 45, 
                    height: 2,
                    top: 17,
                    marginLeft: 4,
                    transform: [{rotate: '45deg'}],
                }} />}
                {!ntnu && <View style={{
                    position: 'absolute',
                    backgroundColor: 'red', 
                    width: 45, 
                    height: 2,
                    top: 17,
                    right: 55,
                    transform: [{rotate: '45deg'}],
                }} />}
            </View>
        </View>
    )
}