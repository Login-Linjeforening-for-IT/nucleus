import React, {useState } from 'react';
const GLOBAL = require('../styles/themes/dark')
import { T } from '../styles/text'
import { 
    View, 
    Text, 
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';
import { GS } from '../styles/globalStyles';
import { useSelector } from 'react-redux';

export default function Dropdown() {
    
    const { lang  } = useSelector( (state) => state.lang  )

    const [bcourses] = useState([
        {id: '0', titleNO: 'Dataingeniør', titleEN: 'Computer Science', link: 'https://www.ntnu.no/studier/bidata'},
        {id: '1', titleNO: 'Digital infrastruktur og cybersikkerhet', titleEN: 'Digital Infrastructure and Cyber Security', link: 'https://www.ntnu.no/studier/bdigsec'},
        {id: '2', titleNO: 'Programmering', titleEN: 'Programming', link: 'https://www.ntnu.no/studier/bprog'}
    ])
    const [mcourses] = useState([
        {id: '0', title: 'Information Security', link: 'https://www.ntnu.no/studier/mis'},
        {id: '1', title: 'Applied Computer Science', link: 'https://www.ntnu.edu/studies/macs'},
        {id: '2', title: 'Computational colour and spectral imaging', link: 'https://www.ntnu.no/studier/mscosi'}
    ])

    const [pcourses] = useState([
        {id: '0', titleNO: 'Informasjonsikkerhet og kommunikasjonsteknologi', titleEN: 'Information Security and Communication Technology', link: 'https://www.ntnu.no/studier/phisct'},
        {id: '1', titleNO: 'Datateknologi og informatikk', titleEN: 'Computer Science', link: 'https://www.ntnu.no/studier/phcos'},
        {id: '2', titleNO: 'Elektronikk og telekommunikasjon', titleEN: 'Electronics and Telecommunication', link: 'https://www.ntnu.no/studier/phet'}
    ])

    const [course, selectCourse] = useState({
        selected: 0
    })

    const selectedDegree = (val) => {
        if (course.selected == val) {
            selectCourse({
                ...course,
                selected: -1,
              });
        } else {
            selectCourse({
                ...course,
                selected: val,
              });
        }
      }

      return(
        <View>
            <TouchableOpacity onPress={() => selectedDegree(1)}>
                <View style={GS.dropdown}>
                { course.selected == 1 ?
                    <Image style={GS.dropImage} source={require('../assets/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../assets/dropdown-orange.png')} />
                }
                        <Text style={T.centered}>Bachelor</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected == 1 ? 
                    bcourses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={GS.dropdownContent}>
                                    <Text style={T.text15}>{lang ? selectedCourse.titleNO : selectedCourse.titleEN}</Text>
                                    <Image style={GS.smallDropImage} source={require('../assets/linkicon-white.png')} />
                                </View>
                            </TouchableOpacity>
                            
                        )
                    })
                : null
                }
            </View>

            <TouchableOpacity onPress={() => selectedDegree(2)}>
                <View style={GS.dropdown}>
                { course.selected  == 2 ?
                    <Image style={GS.dropImage} source={require('../assets/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../assets/dropdown-orange.png')} />
                }
                        <Text style={T.centered}>Master</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected == 2 ? 
                    mcourses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={GS.dropdownContent}>
                                    <Text style={T.text15}>{selectedCourse.title}</Text>
                                    <Image style={GS.smallDropImage} source={require('../assets/linkicon-white.png')} />
                                </View>
                            </TouchableOpacity>
                            
                        )
                    })
                : null
                }
            </View>

            <TouchableOpacity onPress={() => selectedDegree(3)}>
                <View style={GS.dropdown}>
                { course.selected  == 3 ?
                    <Image style={GS.dropImage} source={require('../assets/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../assets/dropdown-orange.png')} />
                }
                        <Text style={T.centered}>Ph.d</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected == 3 ? 
                    pcourses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={GS.dropdownContent}>
                                    <Text style={T.text15}>{lang ? selectedCourse.titleNO : selectCourse.titleEN}</Text>
                                    <Image style={GS.smallDropImage} source={require('../assets/linkicon-white.png')} />
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

export function DropdownBachelor() {

    const { lang  } = useSelector( (state) => state.lang  )

    const [courses] = useState([
        {id: '0', titleNO: 'Dataingeniør', titleEN: 'Computer Science', link: 'https://www.ntnu.no/studier/bidata'},
        {id: '1', titleNO: 'Digital infrastruktur og cybersikkerhet', titleEN: 'Digital Infrastructure and Cyber Security', link: 'https://www.ntnu.no/studier/bdigsec'},
        {id: '2', titleNO: 'Programmering', titleEN: 'Programming', link: 'https://www.ntnu.no/studier/bprog'}
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
                <View style={GS.dropdown}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require('../assets/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../assets/dropdown-orange.png')} />
                }
                        <Text style={T.centered}>Bachelor</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ? 
                    courses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={GS.dropdownContent}>
                                    <Text style={T.text15}>{lang ? selectedCourse.titleNO : selectCourse.titleEN}</Text>
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

export function DropdownMaster() {
    const [courses] = useState([
        {id: '0', title: 'Information Security', link: 'https://www.ntnu.no/studier/mis'},
        {id: '1', title: 'Applied Computer Science', link: 'https://www.ntnu.edu/studies/macs'},
        {id: '2', title: 'Computational colour and spectral imaging', link: 'https://www.ntnu.no/studier/mscosi'}
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
                <View style={GS.dropdown}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require('../assets/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../assets/dropdown-orange.png')} />
                }
                        <Text style={T.centered}>Master</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ? 
                    courses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={GS.dropdownContent}>
                                    <Text style={T.text15}>{selectedCourse.title}</Text>
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

export function DropdownPHD() {

    const { lang  } = useSelector( (state) => state.lang  )

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
                <View style={GS.dropdown}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require('../assets/linkselected.png')} />
                :
                    <Image style={GS.dropImage} source={require('../assets/dropdown-orange.png')} />
                }
                        <Text style={T.centered}>Ph.d</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ? 
                    courses.map((selectedCourse, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={GS.dropdownContent}>
                                    <Text style={T.text15}>{lang ? selectedCourse.titleNO : selectedCourse.titleEN}</Text>
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