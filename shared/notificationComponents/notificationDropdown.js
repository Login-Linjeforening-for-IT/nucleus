import React, {useState } from 'react';
import { T } from '../../styles/text'
import { 
    View, 
    Text, 
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';
import { GS } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';

/**
 * Dropdown menu for notifications.
 * @returns Dropdown view
 */
export function NotificationDropdown() {

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    const [courses] = useState([
        {id: '0', titleNO: 'Informasjonsikkerhet og kommunikasjonsteknologi', titleEN: 'Information Security and Communication Technology', link: 'https://www.ntnu.no/studier/phisct'},
        {id: '1', titleNO: 'Datateknologi og informatikk', titleEN: 'Computer Science', link: 'https://www.ntnu.no/studier/phcos'},
        {id: '2', titleNO: 'Elektronikk og telekommunikasjon', titleEN: 'Electronics and Telecommunication', link: 'https://www.ntnu.no/studier/phet'}
    ])

    const [course, selectCourse] = useState({
        selected: 0
      })

    const selectedDegree = () => {
        selectCourse({
          ...course,
          selected: !course.selected,
        });
    }

    return(
        <View>
            <TouchableOpacity onPress={() => selectedDegree()}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require('../../assets/icons/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../../assets/icons/dropdown-orange.png')} />
                }
                        <Text style={{...T.centered, color: FetchColor(theme, 'TEXTCOLOR')}}>Ph.d</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ? 
                    courses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
                                    <Text style={{...T.text15, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? selectedCourse.titleNO : selectedCourse.titleEN}</Text>
                                </View>
                            </TouchableOpacity>
                            
                        )
                    })
                : null
                }
            </View>
        </View>
        
    )
}