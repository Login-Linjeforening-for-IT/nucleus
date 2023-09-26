// This file contains several dropdown menus mostly but not exclusively used by
// the AboutScreen.

import { View, Text, TouchableOpacity, Linking, Image } from "react-native"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, {useState } from "react"
import { T } from "@styles/text"

/**
 * Creates a full dropdownmenu for bachelor, master and phd
 * @returns View
 */
export default function Dropdown() {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const titleNO = {
        data: "Dataingeniør",
        digsec: "Digital infrastruktur og cybersikkerhet",
        prog: "Programmering",
        infosec: "Informasjonsikkerhet og kommunikasjonsteknologi",
        cs: "Datateknologi og informatikk",
        phet: "Elektronikk og telekommunikasjon"
    }

    const titleEN = {
        data: "Computer Science",
        digsec: "Digital Infrastructure and Cyber Security",
        prog: "Programming",
        infosec: "Information Security and Communication Technology",
        cs: "Computer Science",
        phet: "Electronics and Telecommunication" 
    }

    const title = lang ? titleNO : titleEN

    const [bcourses] = useState([
        {id: 0, title: title.data, link: "https://www.ntnu.no/studier/bidata"},
        {id: 1, title: title.digsec, link: "https://www.ntnu.no/studier/bdigsec"},
        {id: 2, title: title.prog, link: "https://www.ntnu.no/studier/bprog"}
    ])
    const [mcourses] = useState([
        {id: 0, title: "Information Security", link: "https://www.ntnu.no/studier/mis"},
        {id: 1, title: "Applied Computer Science", link: "https://www.ntnu.edu/studies/macs"},
        {id: 2, title: "Computational colour and spectral imaging", link: "https://www.ntnu.no/studier/mscosi"}
    ])

    const [pcourses] = useState([
        {id: 0, title: title.infosec, link: "https://www.ntnu.no/studier/phisct"},
        {id: 1, title: title.cs, link: "https://www.ntnu.no/studier/phcos"},
        {id: 2, title: title.phet, link: "https://www.ntnu.no/studier/phet"}
    ])

    const [course, selectCourse] = useState({
        selected: 0
    })

    const selectedDegree = (val: number) => {
        if (course.selected === val) {
            selectCourse({
                ...course,
                selected: -1,
              })
        } else {
            selectCourse({
                ...course,
                selected: val,
              })
        }
      }

      return (
        <View>
            <TouchableOpacity onPress={() => selectedDegree(1)}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                { course.selected === 1 ?
                    <Image style={GS.dropImage} source={require("@assets/icons/linkselected.png")} />
                :
                    <Image style={GS.dropImage} source={require("@assets/icons/dropdown-orange.png")} />
                }
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>Bachelor</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected === 1 ?
                    bcourses.map((selectedCourse, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                                    <Text style={{...T.text15, maxWidth: "91%", color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{selectedCourse.title}</Text>
                                    <Image style={GS.smallDropImage} source={require("@assets/icons/linkicon-white.png")} />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                : null
                }
            </View>

            <TouchableOpacity onPress={() => selectedDegree(2)}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                { course.selected  === 2 ?
                    <Image style={GS.dropImage} source={require("@assets/icons/linkselected.png")} />
                :
                    <Image style={GS.dropImage} source={require("@assets/icons/dropdown-orange.png")} />
                }
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>Master</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected === 2 ?
                    mcourses.map((selectedCourse, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                                    <Text style={{...T.text15, maxWidth: "91%", color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{selectedCourse.title}</Text>
                                    <Image style={GS.smallDropImage} source={theme === 0 || theme === 2 || theme === 3 ? require("@assets/icons/linkicon-white.png") : require("@assets/icons/linkicon-black.png")} />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                : null
                }
            </View>

            <TouchableOpacity onPress={() => selectedDegree(3)}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                { course.selected  === 3 ?
                    <Image style={GS.dropImage} source={require("@assets/icons/linkselected.png")} />
                :
                    <Image style={GS.dropImage} source={require("@assets/icons/dropdown-orange.png")} />
                }
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>Ph.d</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected === 3 ?
                    pcourses.map((selectedCourse, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                                    <Text style={{...T.text15, maxWidth: "91%",  color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{selectedCourse.title}</Text>
                                    <Image style={GS.smallDropImage} source={require("@assets/icons/linkicon-white.png")} />
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

/**
 * Dropdown menu for bachelor
 * @returns View
 */
export function DropdownBachelor() {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const titleNO = {
        data: "Dataingeniør",
        digsec: "Digital infrastruktur og cybersikkerhet",
        prog: "Programmering"
    }

    const titleEN = {
        data: "Computer Science",
        digsec: "Digital Infrastructure and Cyber Security",
        prog: "Programming"
    }

    const title = lang ? titleNO : titleEN

    const [courses] = useState([
        {id: 0, title: title.data, link: "https://www.ntnu.no/studier/bidata"},
        {id: 1, title: title.digsec, link: "https://www.ntnu.no/studier/bdigsec"},
        {id: 2, title: title.prog, link: "https://www.ntnu.no/studier/bprog"}
    ])

    const [course, selectCourse] = useState({
        selected: false
      })

    const selectedDegree = () => {
        selectCourse({
            ...course,
            selected: !course.selected,
        })
    }

    return (
        <View>
            <TouchableOpacity onPress={() => selectedDegree()}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require("@assets/icons/linkselected.png")} />
                :
                    <Image style={GS.dropImage} source={require("@assets/icons/dropdown-orange.png")} />
                }
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>Bachelor</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ?
                    courses.map((selectedCourse, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                                    <Text style={{...T.text15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{selectedCourse.title}</Text>
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

/**
 * Dropdown menu for master
 * @returns View
 */
export function DropdownMaster() {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    const [courses] = useState([
        {id: 0, title: "Information Security", link: "https://www.ntnu.no/studier/mis"},
        {id: 1, title: "Applied Computer Science", link: "https://www.ntnu.edu/studies/macs"},
        {id: 2, title: "Computational colour and spectral imaging", link: "https://www.ntnu.no/studier/mscosi"}
    ])

    const [course, selectCourse] = useState({
        selected: false
    })

    const selectedDegree = () => {
        selectCourse({
          ...course,
          selected: !course.selected,
        })
      }

    return (
        <View>
            <TouchableOpacity onPress={() => selectedDegree()}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require("@assets/icons/linkselected.png")} />
                :
                    <Image style={GS.dropImage} source={require("@assets/icons/dropdown-orange.png")} />
                }
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>Master</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ?
                    courses.map((selectedCourse, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                                    <Text style={{...T.text15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{selectedCourse.title}</Text>
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

/**
 * Dropdown menu for PHD
 * @returns View
 */
export function DropdownPHD() {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const titleNO = {
        infosec: "Informasjonsikkerhet og kommunikasjonsteknologi",
        cs: "Datateknologi og informatikk",
        phet: "Elektronikk og telekommunikasjon"
    }

    const titleEN = {
        infosec: "Information Security and Communication Technology",
        cs: "Computer Science",
        phet: "Electronics and Telecommunication" 
    }

    const title = lang ? titleNO : titleEN

    const [courses] = useState([
        {id: 0, title: title.infosec, link: "https://www.ntnu.no/studier/phisct"},
        {id: 1, title: title.cs, link: "https://www.ntnu.no/studier/phcos"},
        {id: 2, title: title.phet, link: "https://www.ntnu.no/studier/phet"}
    ])

    const [course, selectCourse] = useState({
        selected: false
      })

    const selectedDegree = () => {
        selectCourse({
          ...course,
          selected: !course.selected,
        })
      }

    return (
        <View>
            <TouchableOpacity onPress={() => selectedDegree()}>
                <View style={{...GS.dropdown, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                { course.selected ?
                    <Image style={GS.dropImage} source={require("@assets/icons/linkselected.png")} />
                :
                    <Image style={GS.dropImage} source={require("@assets/icons/dropdown-orange.png")} />
                }
                        <Text style={{...T.centered, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>Ph.d</Text>
                </View>
            </TouchableOpacity>

            <View>
                { course.selected ?
                    courses.map((selectedCourse, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => Linking.openURL(selectedCourse.link)}>
                                <View style={{...GS.dropdownContent, backgroundColor: FetchColor({theme, variable: "CONTRAST"})}}>
                                    <Text style={{...T.text15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{selectedCourse.title}</Text>
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