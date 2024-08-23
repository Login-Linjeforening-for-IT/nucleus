import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native"
import ReadOnly from "./readonly"
import { useSelector } from "react-redux"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Markdown from "./markdown"
import ThumbsUp from "./thumbsUp"
import ThumbsDown from "./thumbsDown"

type CourseContentProps = {
    course: Course, 
    clicked: number[]
    setClicked: Dispatch<SetStateAction<number[]>>
}

type CardProps = {
    card: Card, 
    shuffledAlternatives: string[], 
    indexMapping: number[], 
    handlePress: (index: number) => void, 
    getBackground: (index: number) => string
    cardID: number
}

type CardFooterProps = {
    votes: number, 
    cardID: number, 
    setCardID: Dispatch<SetStateAction<number>>, 
    length: number,
    clicked: number[],
    setClicked: Dispatch<SetStateAction<number[]>>
    correct: number[]
}

export default function CourseContent({course, clicked, setClicked}: CourseContentProps) {
    if (course.mark) return <ReadOnly text={course.textUnreviewed.join('\n')} />

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const height = Dimensions.get("window").height
    const [cardID, setCardID] = useState<number>(0)
    const [shuffledAlternatives, setShuffledAlternatives] = useState<string[]>([])
    const [indexMapping, setIndexMapping] = useState<number[]>([])
    const card = course.cards[cardID]

    function handlePress(index: number) {
        if (!clicked.includes(index)) {
            setClicked([...clicked, index])
        }
    }

    function getBackground(index: number) {

        if (card?.correct.length > 1) {
            if (card?.correct.every((correct) => clicked.includes(correct))) {
                return card?.correct.includes(index) ? 'green' : clicked.includes(index) ? 'red' : theme.contrast
            } else {
                return clicked.includes(index) ? theme.darker : theme.contrast
            }
        }

        return clicked.includes(index) 
            ? card?.correct.includes(index) ? 'green' : 'red' 
            : theme.contrast
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
        <View style={{
            backgroundColor: theme.contrast, 
            height: height * 0.75, 
            borderRadius: 20, 
            padding: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10,
        }}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
                style={{maxHeight: height * 0.65 }}
            >
                <Card 
                    card={card}
                    cardID={cardID}
                    shuffledAlternatives={shuffledAlternatives} 
                    indexMapping={indexMapping} 
                    handlePress={handlePress} 
                    getBackground={getBackground}
                />
            </ScrollView>
            <CardFooter 
                votes={card?.votes.length} 
                cardID={cardID} 
                setCardID={setCardID} 
                length={course.cards.length}
                clicked={clicked}
                setClicked={setClicked}
                correct={card?.correct}
            />
        </View>
    )
}

function Card({card, cardID, shuffledAlternatives, indexMapping, handlePress, getBackground}: CardProps) {
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
                        {cardID + 1} - Multiple choice
                    </Text>}
                    {<Text style={{
                        fontSize: 18, 
                        marginBottom: 4, 
                        color: theme.oppositeTextColor
                    }}>
                        {!(card?.correct.length > 1) && cardID + 1}{card?.theme && ' - '}{card?.theme}
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
                            paddingRight: 30
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
        </>
    )
}

function CardFooter({votes, cardID, setCardID, length, clicked, setClicked, correct}: CardFooterProps) {
    const width = Dimensions.get("window").width
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const next = cardID + 1
    const previous = cardID - 1
    const solved = correct?.every((current) => clicked.includes(current)) || 0
    const revealText = solved 
        ? lang ? 'Skjul svar' : 'Hide answer'
        : lang ? 'Vis svar' : 'Show answer'

    function handlePrevious() {
        setClicked([])
        setCardID(previous >= 0 ? previous : cardID)
    }

    function handleSkip() {
        setClicked([])
        setCardID(next < length ? next : cardID)
    }

    function handleNext() {
        // check question logic and reveal answer
        setClicked([])
        setCardID(next < length ? next : cardID)
    }

    function handleReveal() {
        solved ? setClicked([]) : setClicked([...correct])
    }

    return (
        <View style={{
            flexDirection: 'row', 
            bottom: 20, 
            position: 'absolute', 
            justifyContent: 'space-between', 
            height: 30, 
            width: width * 0.86, 
            marginHorizontal: 14
        }}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    fontSize: 18, 
                    color: theme.oppositeTextColor, 
                    top: 2, 
                    marginRight: 2
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
            <TouchableOpacity 
                style={{
                    width: 25, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }} 
                onPress={() => handlePrevious()}
            >
                <Text style={{
                    fontSize: 22, 
                    color: theme.oppositeTextColor
                }}>
                    ◀
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSkip()}>
                <Text style={{
                    fontSize: 18, 
                    color: theme.oppositeTextColor, 
                    top: 2
                }}>
                    Skip
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: 25, 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }} 
                onPress={handleNext}
            >
                <Text style={{
                    fontSize: 22, 
                    color: theme.oppositeTextColor
                }}>
                    ▶
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReveal}>
                <Text style={{
                    fontSize: 18, 
                    color: theme.oppositeTextColor, 
                    top: 2
                }}>
                    {revealText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
