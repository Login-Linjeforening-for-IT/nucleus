import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import CS from "@styles/clusterStyles"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import Swipe from "@components/nav/swipe"
import { ExamProps } from "@type/screenTypes"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import CourseError from "@components/exam/courseError"
import { getCourses } from "@utils/exam"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { View, Image, TouchableOpacity, Dimensions, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Navigation } from "@/interfaces"

type CourseListProps = {
    course: CourseAsList
    setParentCourseID: Dispatch<SetStateAction<string>>
}

export default function ExamScreen({ navigation }: ExamProps<'ExamScreen'>): JSX.Element {
    const [courses, setCourses] = useState<string | CourseAsList[]>([])
    const { theme } = useSelector((state: ReduxState) => state.theme )
    const [activeCourse, setActiveCourse] = useState<Course | string>("")
    const [activeCourseID, setActiveCourseID] = useState<string>("")
    const [refresh, setRefresh] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        const courses = await getCourses()
        
        if (courses) {
            setRefresh(false)
        }
    }, [refresh])

    return (
        <Swipe left="MenuScreen">
            <View style={{...GS.content, backgroundColor: theme.darker}}>
                <Space height={Dimensions.get("window").height / 8} />
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                    scrollEventThrottle={100}
                >
                    {typeof courses === 'string' && <CourseError text={courses} />}
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                    {typeof courses !== 'string' && courses.map((course: CourseAsList) => 
                        <CourseList 
                            key={course.id} 
                            course={course} 
                            setParentCourseID={setActiveCourseID}
                        />
                    )}
                    {typeof activeCourse !== 'string' && <Course course={activeCourse} />}
                </ScrollView>
            </View>
        </Swipe>
    )
}


function CourseList({ course, setParentCourseID }: CourseListProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const navigation: Navigation = useNavigation()

    function handlePress() {
        navigation.navigate("SpecificEventScreen", {courseID: course.id})
        setParentCourseID(course.id)
    }

    return (
        <TouchableOpacity style={{ marginBottom: 6 }} onPress={handlePress}>
            <Cluster>
                <View style={{...CS.clusterBack}}>
                    <View style={CS.twinLeft}>
                        <Text style={{...T.text20, color: theme.textColor}}>
                            {course.id}
                        </Text>
                    </View>
                    <View style={CS.twinRight}>
                        <Image
                            style={CS.arrowImage}
                            source={require("@assets/icons/dropdownBase.png")}
                        />
                    </View>
                </View>
            </Cluster>
        </TouchableOpacity>
    )
}

function Course({course}: {course: Course}) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const [refresh, setRefresh] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        const courses = await getCourses()
        
        if (courses) {
            setRefresh(false)
        }
    }, [refresh]);

    return (
        <Swipe left="ExamScreen">
            <View style={{top: 0, position: 'absolute', flex: 1, zIndex: 100, backgroundColor: 'red'}}>
                <Space height={Dimensions.get("window").height / 8} />
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                    scrollEventThrottle={100}
                >
                    {typeof course === 'string' && <CourseError text={course} />}
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                    {typeof course !== 'string' && <CourseContent />}
                </ScrollView>
            </View>
        </Swipe>
    )
}

function CourseContent() {
    return (
        <View style={{backgroundColor: 'white'}}>
            <Text>Course content</Text>
        </View>
    )
}