import React, {useState} from 'react';
import { ES } from '../styles/eventStyles';
const GLOBAL = require('../styles/theme');

import { 
    StyleSheet, 
    View, 
    Text, 
    Switch, 
    TouchableOpacity,
    Image
} from 'react-native';
import Svg, { Circle, Path, SvgUri } from 'react-native-svg';
import { SS } from '../styles/settingStyles';
import { T } from '../styles/text'

export default function GreenLight() {
    return(
    <View style={styles.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" stroke="green" strokeWidth=".5" fill="green" />
        </Svg>
    </View>
    );
};

export function GrayLight() {
    return(
    <View style={styles.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" fill={GLOBAL.DARK.BACKGROUND} />
        </Svg>
    </View>
    );
};

export function CategoryImage(condition) {
    if(!condition) {
        return(
            <View>
                <Image style={ES.specificEventImage} source={require('../assets/default.png')} />
            </View>
        )
    }
}

export function CategoryLight(condition) {
    if (condition === 'TEKKOM') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#A206C9" />
                </Svg>
            </View>
            );
    }else if (condition === 'SOCIAL') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#D62F43" />
                </Svg>
            </View>
            );
    }else if (condition === 'CTF') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#2DA62B" />
                </Svg>
            </View>
            );
    }else if (condition === 'KARRIEREDAG') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#02DEDE" />
                </Svg>
            </View>
            );
    }else if (condition === 'FADDERUKA') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#FA75A6" />
                </Svg>
            </View>
            );
    }else if (condition === 'BEDPRES') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#4060E3" />
                </Svg>
            </View>
            );
    }else if (condition === 'LOGIN') {
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#FD8738" />
                </Svg>
            </View>
            );
    }else{
        return(
            <View style={styles.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#FD8738" />
                </Svg>
            </View>
            );
    }
};

export function RedLight() {
    return(
    <View style={styles.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" fill="red" />
        </Svg>
    </View>
    );
};

export function Check() {
    return(
    <View style={styles.size}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={GLOBAL.DARK.DARKER}>
            <Path d="M13.788 25.588c.04.032.064.076.106.106.06.04.128.048.192.076.076.036.15.07.23.092.078.02.154.03.234.036.114.012.224.012.336-.004.046-.008.09-.02.136-.032.138-.034.266-.088.392-.164.022-.014.04-.03.062-.044.082-.056.17-.098.24-.174.05-.054.072-.124.112-.184.002-.002.006-.004.006-.006L27.752 6.188a1.4 1.4 0 1 0-2.344-1.532L14.4 22.298l-6.088-5.922a1.398 1.398 0 1 0-1.9 2.054l7.324 7.126c.014.014.034.018.052.032z"/>
        </Svg>
    </View>
    );
};

export function bigLogo() {
    return(
        <View>
            {/* WIP good svg for big login logo goes here */}
        </View>
    )
}   

export function Copyright() {
    return(
        <View>
            <Text style={T.copyright}>Opphavsrett © 2022 Login - Linjeforeningen for IT, NO 811 940 372</Text>
        </View>
    )
}
export function Kontakt() {
    return(
    <View>
        <Text/>
        <Text style={T.centered25}>Kontakt</Text>
        <Text style={T.centered15}>Login - Linjeforeningen for IT</Text>
        <Text style={T.centered15}>Teknologivegen 22</Text>
        <Text style={T.centered15}>Bygg A, rom 155</Text>
        <Text style={T.centered15}>2815 GJØVIK</Text>
        <Text/>
        <Text style={T.centered15}>kontakt@logntnu.no</Text>
        <Text/>
        <Text/>
        <Text style={T.red}>map goes here</Text>
        <Text/><Text/><Text/><Text/>
    </View> 
    )
}

export function Notification() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View>
          <Switch
            trackColor={{ true: "#181818" }}
            thumbColor={isEnabled ? "green" : "red"}
            ios_backgroundColor="#080808"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    )
}

export function Theme() {
    const changeTheme = () => {
        setData({
          ...data,
          theme: !data.theme
        });
      }
      
    const [data, setData] = useState({
        theme: 0,
    }) 

    return(
        <View>
            <TouchableOpacity onPress={() => changeTheme()}>
                {data.theme ?
                    <Image style={SS.lightSwitchImage} source={require('../assets/sun.png')} />
                : 
                    <Image style={SS.lightSwitchImage} source={require('../assets/moon.png')} />
                }
            </TouchableOpacity>
        </View>
    )
}

export function Language() {
    const changeLang = () => {
        setData({
          ...data,
          lang: !data.lang
        });
      }
      
    const [data, setData] = useState({
        lang: 0
    }) 
      
    return(
        <View>
          <TouchableOpacity onPress={() => changeLang()}>
        {data.lang ?
            <Text style={SS.langSwitch}>EN</Text>
        : 
            <Text style={SS.langSwitch}>NO</Text>
        }
      </TouchableOpacity>
        </View>
    )
}

export function CheckState(condition) {
    if (condition == true) {
        return(
            <View style = {ES.greenLight}><GreenLight/></View>,
            <View style = {ES.checkContent}><Check/></View>
        ) 
    } else {
        return(
            <View style = {ES.GrayLight}><GrayLight/></View>,
            <View style = {ES.checkContent}><Check/></View>
        )
    }
}

export function Button(props) {
    return(
        <View style={SS.button}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}

export function NotifyButton(props) {
    return(
        <View style={SS.notifyButton}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    size: {
        height: 40,
        width: 40
    },
    smallSize: {
        height: 20,
        width: 20
    },
    specificEventLight: {
        left: 8,
        height: 20,
        width: 20
    },
});