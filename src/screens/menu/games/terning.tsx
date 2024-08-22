import { useState } from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

type DotsProps = {
    amount: number
}

type Positions = {
    [key: number]: { top: string, left: string }[]
}

export default function TerningScreen() {
    const width = Dimensions.get('window').width * 0.6;
    const { theme } = useSelector((state: ReduxState) => state.theme);

    const [diceValue, setDiceValue] = useState(1);

    const rollDice = () => {
        setDiceValue(Math.floor(Math.random() * 6) + 1);
    };

    return (
        <View style={{
            backgroundColor: theme.background,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <TouchableOpacity onPress={rollDice} style={{
                width: width,
                height: width,
                backgroundColor: theme.textColor,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <DiceDots amount={diceValue} />
            </TouchableOpacity>
        </View>
    );
}

function DiceDots({ amount }: DotsProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const dotSize = 50
    const positions: Positions = {
        1: [
            { top: '50%', left: '50%' }
        ],
        2: [
            { top: '30%', left: '30%' }, { top: '70%', left: '70%' }
        ],
        3: [
            { top: '20%', left: '25%' }, { top: '50%', left: '50%' }, 
            { top: '80%', left: '75%' }
        ],
        4: [
            { top: '20%', left: '25%' }, { top: '20%', left: '75%' }, 
            { top: '80%', left: '25%' }, { top: '80%', left: '75%' }
        ],
        5: [
            { top: '20%', left: '25%' }, { top: '20%', left: '75%' }, 
            { top: '50%', left: '50%' }, { top: '80%', left: '25%' }, 
            { top: '80%', left: '75%' }
        ],
        6: [
            { top: '20%', left: '25%' }, { top: '50%', left: '25%' }, 
            { top: '80%', left: '25%' }, { top: '20%', left: '75%' },
            { top: '50%', left: '75%' }, { top: '80%', left: '75%' }
        ],
    }

    const dotStyle = {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: theme.background,
        position: 'absolute',
        transform: [{ translateX: -dotSize / 2 }, { translateY: -dotSize / 2 }],
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            {positions[amount].map((pos, index) => (
                // @ts-expect-error
                <View key={index} style={[dotStyle, { top: pos.top, left: pos.left, position: 'absolute' }]} />
            ))}
        </View>
    );
}
