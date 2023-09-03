import AdInfo, { AdBanner, AdTitle, AdDescription, AdUpdateInfo, AdMedia } from '../shared/ad';
import { View, ScrollView, Dimensions } from 'react-native';
import Cluster from '../shared/functions/cluster';
import BottomMenu from '../shared/bottomMenu';
import Space from '../shared/functions/space';
import FetchColor from '../styles/fetchTheme';
import { GS } from '../styles/globalStyles';
import { useSelector } from 'react-redux';
import TopMenu from '../shared/topMenu';
import React from 'react';

export default function SpecificAdScreen( { route, navigation }) {

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )
    const { item } = route.params

    return(
        <View>
            <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Space(Dimensions.get('window').height/8.1)}
                    <Cluster>
                        {item.banner_image ? <AdBanner props={item.banner_image}/>:null}
                        {Space(10)}
                        <AdTitle props={item}/>
                        {Space(10)}
                        <AdInfo props={item}/>
                        {Space(10)}
                        <AdDescription props={item}/>
                        {Space(10)}
                        <AdMedia props={item}/>
                        <AdUpdateInfo props={item}/>
                        {Space(10)}
                    </Cluster>
                    {Space(Dimensions.get('window').height/3)}
                </ScrollView>
            </View>    
            <TopMenu navigation={navigation} title={lang ? item.title_no : item.title_no} back={"AdScreen"} />
            <BottomMenu navigation={navigation} screen="sas" />
        </View>
    )
};