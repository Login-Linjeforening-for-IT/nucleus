import { View, Text, Image } from 'react-native';
import FetchColor from 'login/styles/fetchTheme';
import { GS } from 'login/styles/globalStyles';
import { useSelector } from 'react-redux';
import { T } from 'login/styles/text';
import Space from 'login/shared/components/utils';

export default function Paragraph({ logo, title, body }) {
    const { theme } = useSelector((state) => state.theme)

    return(
        <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={logo} />
                <Text style={{...T.bold28, color: FetchColor(theme, 'TEXTCOLOR')}}>{title}</Text>
              </View>
              <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{body}</Text>
              {Space(25)}
        </View>
    )
}