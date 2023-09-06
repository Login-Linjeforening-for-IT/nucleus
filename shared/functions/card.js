import FetchColor from 'login/styles/fetchTheme';
import { ES } from 'login/styles/eventStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

/**
 * Card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Card (props) {
    const { theme } = useSelector( (state) => state.theme )

    const card = (
            <View style={{...ES.card, backgroundColor: FetchColor(theme, 'DARKER')}}>
                <View style={ES.cardContent}>
                    { props.children }
                </View>
            </View>
    )
    
    return card
};

/**
 * Smaller card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export function CardSmaller (props) {
    
    const { theme } = useSelector( (state) => state.theme )

    const card = (
        <View style={{...ES.cardSmaller, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View>
                { props.children }
            </View>
        </View>
    );
    
    return card
};