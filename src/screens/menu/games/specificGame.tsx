import { MenuProps } from "@type/screenTypes"
import { useDispatch, useSelector } from "react-redux"
import Parent from "@components/shared/parent"
import { setLocalTitle } from "@redux/misc"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { 
    getQuestions, 
    getNeverHaveIEver, 
    getOkRedFlagDealbreaker 
} from "@utils/game"
import Swiper from "@components/games/swiper"
import Filters from "@components/games/filters"
import { ScrollView } from "react-native-gesture-handler"

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
            {game[0].hasOwnProperty('categories') && null}
            <Filters 
                mode={mode} 
                school={school} 
                ntnu={ntnu} 
                setMode={setMode} 
                setSchool={setSchool} 
                setNTNU={setNTNU} 
            />
        </View>
    )
}