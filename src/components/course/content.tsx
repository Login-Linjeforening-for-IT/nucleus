import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import ReadOnly from "./readonly"
import { useSelector } from "react-redux"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import Markdown from "./markdown"
import ThumbsUp from "./thumbsUp"
import ThumbsDown from "./thumbsDown"

type CourseContentProps = {
    course: Course, 
    clicked: number[]
    setClicked: Dispatch<SetStateAction<number[]>>
    cardID: number
    setCardID: Dispatch<SetStateAction<number>>
    previous: number
    next: number
}

type CardProps = {
    card: Card, 
    shuffledAlternatives: string[], 
    indexMapping: number[], 
    handlePress: (index: number) => void, 
    getBackground: (index: number) => string
    cardID: number
    length: number
}

type CardFooterProps = {
    votes: number, 
    clicked: number[],
    setClicked: Dispatch<SetStateAction<number[]>>
    correct: number[]
}

export default function CourseContent({course, clicked, setClicked, cardID, setCardID, previous, next}: CourseContentProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const height = Dimensions.get("window").height
    const [shuffledAlternatives, setShuffledAlternatives] = useState<string[]>([])
    const [indexMapping, setIndexMapping] = useState<number[]>([])
    const card = course.cards[cardID]
    const length = course.cards.length

    function handlePress(index: number) {
        if (!clicked.includes(index)) {
            setClicked([...clicked, index])
        }
    }

    function getBackground(index: number) {

        if (card?.correct.length > 1) {
            if (card?.correct.every((correct) => clicked.includes(correct))) {
                return card?.correct.includes(index) ? 'green' : clicked.includes(index) ? 'red' : theme.background
            } else {
                return clicked.includes(index) ? theme.darker : theme.background
            }
        }

        return clicked.includes(index) 
            ? card?.correct.includes(index) ? 'green' : 'red' 
            : theme.background
    }

    useEffect(() => {
        if (!card?.alternatives) {
            return
        }

        // Shuffles alternatives and creates map
        const shuffled = [...card.alternatives]
        const mapping = shuffled.map((_, index) => index)
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            ;[mapping[i], mapping[j]] = [mapping[j], mapping[i]]
        }
        
        setShuffledAlternatives(shuffled)
        setIndexMapping(mapping)
    }, [card?.alternatives])

    return (
        <View style={{ padding: 12 }}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
                style={{maxHeight: height * 0.7}}
            >
                <Card 
                    card={card}
                    cardID={cardID}
                    shuffledAlternatives={shuffledAlternatives} 
                    indexMapping={indexMapping} 
                    length={length}
                    handlePress={handlePress} 
                    getBackground={getBackground}
                />
            </ScrollView>
            <CardFooter 
                votes={card?.votes.length} 
                clicked={clicked}
                setClicked={setClicked}
                correct={card?.correct}
            />
        </View>
    )
}

function Card({card, cardID, shuffledAlternatives, indexMapping, length, handlePress, getBackground}: CardProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <>
            <View>
                <View>
                    {card?.correct.length > 1 && <Text style={{
                        fontSize: 18, 
                        marginBottom: 4, 
                        color: theme.oppositeTextColor
                    }}>
                        {cardID + 1} {cardID >= (length - 5) ? `/ ${length} ` : ''}- Multiple choice
                    </Text>}
                    {<Text style={{
                        fontSize: 18, 
                        marginBottom: 4, 
                        color: theme.oppositeTextColor
                    }}>
                        {!(card?.correct.length > 1) && cardID + 1}{cardID >= (length - 5) ? ` / ${length} ` : ''}{card?.theme && ' - '}{card?.theme}
                    </Text>}
                </View>
                <View style={{position: 'absolute', right: 0}}>
                    <Text style={{
                        fontSize: 18, 
                        marginBottom: 4, 
                        color: theme.oppositeTextColor
                    }}>
                        {card?.source}
                    </Text>
                </View>
            </View>
            <Markdown text={card.question}/>
            <View style={{marginBottom: 30}}>
                {shuffledAlternatives.map((answer, index) => {
                    const originalIndex = indexMapping[index]

                    return (
                        <TouchableOpacity
                            key={index} 
                            style={{
                                flexDirection: 'row', 
                                backgroundColor: getBackground(originalIndex), 
                                marginTop: 8, 
                                padding: 4, 
                                borderRadius: 8, 
                                paddingVertical: 8,
                                paddingRight: 30,
                            }}
                            onPress={() => handlePress(originalIndex)}
                        >
                            <Text style={{
                                color: theme.oppositeTextColor, 
                                marginLeft: 2, 
                                marginRight: 4, 
                                fontSize: 18, 
                                width: 20
                            }}>
                                {index + 1}
                            </Text>
                            <Text style={{color: theme.textColor, fontSize: 18}}>
                                {answer}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    )
}

function CardFooter({votes, clicked, setClicked, correct}: CardFooterProps) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const solved = correct?.every((current) => clicked.includes(current)) || 0
    const revealText = solved 
        ? lang ? 'Skjul svar' : 'Hide answer'
        : lang ? 'Vis svar' : 'Show answer'

    function handleReveal() {
        solved ? setClicked([]) : setClicked([...correct])
    }

    return (
        <View style={{
            flexDirection: 'row', 
            bottom: 0, 
            position: 'absolute', 
            justifyContent: 'space-between', 
            alignSelf: 'center',
            height: 40, 
            width: '100%', 
            paddingTop: 10,
            paddingBottom: 5,
            backgroundColor: theme.contrast,
        }}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    fontSize: 18, 
                    color: theme.oppositeTextColor, 
                    top: 2, 
                    marginRight: 2,
                    marginLeft: 5
                }}>
                    {votes}
                </Text>
                <ThumbsUp
                    style={{width: 22, marginLeft: 4}} 
                    color={theme.oppositeTextColor} 
                />
                <ThumbsDown
                    style={{width: 22, marginLeft: 2}} 
                    color={theme.oppositeTextColor} 
                />
            </View>
            <TouchableOpacity onPress={handleReveal}>
                <Text style={{
                    fontSize: 18, 
                    color: theme.oppositeTextColor, 
                    top: 2,
                    marginRight: 5,
                }}>
                    {revealText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
