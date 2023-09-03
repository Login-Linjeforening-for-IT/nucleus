import FetchColor from '../../styles/fetchTheme';
import { SS } from '../../styles/settingStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

/**
 * Returns a Login colored button
 * @param {*} props 
 * @returns Button with the content displayed inside
 */
export default function Button (props) { //Button, Login colored

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...SS.button, backgroundColor: FetchColor(theme, 'ORANGE')}}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}