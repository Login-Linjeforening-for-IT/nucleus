import { MenuProps } from "@type/screenTypes"
import { useDispatch, useSelector } from "react-redux"
import Parent from "@components/shared/parent"
import ThumbsUp from "@components/course/thumbsUp"
import ThumbsDown from "@components/course/thumbsDown"
import { setLocalTitle } from "@redux/misc"
import { 
    Dispatch, 
    SetStateAction, 
    useCallback, 
    useEffect, 
    useState 
} from "react"
import { 
    Dimensions, 
    RefreshControl, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native"

import { 
    getQuestions, 
    getNeverHaveIEver, 
    getOkRedFlagDealbreaker 
} from "@utils/game"
import Swiper from "@components/games/swiper"

type GameContentProps = {
    game: Question[] | NeverHaveIEver[] | OkRedFlagDealBreaker[], 
    clicked: number[]
    setClicked: Dispatch<SetStateAction<number[]>>
}

type CardProps = {
    card: Question | NeverHaveIEver | OkRedFlagDealBreaker, 
    shuffledAlternatives: string[], 
    indexMapping: number[], 
    handlePress: (index: number) => void, 
}

export default function SpecificGameScreen({ route }: MenuProps<"SpecificGameScreen">): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { localTitle } = useSelector((state: ReduxState) => state.misc)
    const [refresh, setRefresh] = useState(false)
    const [game, setGame] = useState<Question[] | NeverHaveIEver[] | OkRedFlagDealBreaker[] | string>("")
    const [clicked, setClicked] = useState<number[]>([])
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

    const onRefresh = useCallback(async () => {
        setRefresh(true)
        const game = await fetchGame()
        
        if (game) {
            setClicked([])
            setRefresh(false)
        }
    }, [refresh])

    return (
        <Parent left="GameScreen" noPadding={true} colors={[theme.orange, 'red', theme.orange]}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
            >
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            {typeof game === 'string' 
                ? <Text style={{ fontSize: 18, color: theme.textColor }}>{game}</Text> 
                : <Swiper game={game} />
            }
            </ScrollView>
        </Parent>
    )
}
