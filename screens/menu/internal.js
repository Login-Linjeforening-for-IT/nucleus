import topic from '../../shared/notificationComponents/topic';
import FetchColor from '../../styles/fetchTheme';
import Space from '../../shared/components/utils';
import Card from '../../shared/functions/card';
import { GS } from '../../styles/globalStyles';                                     // Global styles
import TopMenu from '../../shared/topMenu';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { T } from '../../styles/text';                                              // Text styles
import { 
  Text, 
  View, 
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';


{/* ========================= APP START ========================= */}

export default function InternalScreen({ navigation }) {

    const { lang  } = useSelector( (state) => state.lang  )
    const { login } = useSelector( (state) => state.login )
    const { theme } = useSelector( (state) => state.theme )

    const [setting] = useState([
        {id: '0', nav: 'TodoScreen', arg: 1, titleEN: 'Todo'},
        {id: '1', nav: 'MakeNotificationScreen', arg: 0, titleEN: 'Send notification'},
    ])


  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
          <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item, index}) => (
            <View>{index == 0 ? Space(Dimensions.get('window').height/8): null}
            <TouchableOpacity onPress={() => topic("maintenance", index == 1 ? true:undefined)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{"Maintenance " + item.arg}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          {Space(Dimensions.get('window').height/3)}
      </View>    
    
        <TopMenu navigation={navigation} title={lang ? "Internt" : "Intranet"} back={"MenuScreen"} />
    </View>
  )
};