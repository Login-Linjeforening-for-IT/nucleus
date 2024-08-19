import { MenuProps } from "@type/screenTypes"
import { useDispatch, useSelector } from "react-redux"
import Parent from "@components/shared/parent"
import { setLocalTitle } from "@redux/misc"
import { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
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
    
    if (localTitle?.screen !== "SpecificGameScreen") {
        dispatch(setLocalTitle({title: route.params.gameName, screen: "SpecificGameScreen"}))
    }

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
        <Parent left="GameScreen" noPadding={true} colors={[theme.orange, 'red', theme.orange]}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
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
    const [selected, setSelected] = useState(0)

    function handlePress(index: number) {
        setSelected(index)
    }

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center'}}>
            <Swiper game={game} mode={selected} />
            <View style={{
                flexDirection: 'row', 
                width: '100%', 
                justifyContent: 'space-evenly', 
                maxWidth: '80%', 
                position: 'absolute', 
                borderWidth: 2, 
                borderRadius: 4, 
                top: '15%',
                borderColor: theme.contrast,
                overflow: 'hidden',
            }}>
                <TouchableOpacity 
                    style={{
                        backgroundColor: selected == 0 ? theme.contrast : undefined, 
                        paddingHorizontal: 15, 
                        paddingVertical: 2,
                    }} 
                    onPress={() => handlePress(0)}>
                    <Text style={{color: theme.textColor, fontSize: 20}}>
                        {lang ? 'Snill' : 'Nice'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        backgroundColor: selected == 1 ? theme.contrast : undefined, 
                        paddingHorizontal: 15, 
                        paddingVertical: 2 
                    }} 
                    onPress={() => handlePress(1)}>
                    <Text style={{color: theme.textColor, fontSize: 20}}>
                        {lang ? 'Blandet' : 'Mix'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        backgroundColor: selected == 2 ? theme.contrast : undefined, 
                        paddingHorizontal: 15, 
                        paddingVertical: 2 
                    }} 
                    onPress={() => handlePress(2)}>
                    <Text style={{color: theme.textColor, fontSize: 20}}>
                        {lang ? 'Dristig' : 'Bold'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}