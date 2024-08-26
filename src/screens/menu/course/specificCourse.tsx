import { MenuProps } from "@type/screenTypes"
import { useDispatch, useSelector } from "react-redux"
import Parent from "@components/shared/parent"
import { setLocalTitle } from "@redux/misc"
import { getCourse } from "@utils/course"
import { useCallback, useEffect, useState } from "react"
import { RefreshControl, Text } from "react-native"
import Swipeable from "@components/course/swipeable"
import { ScrollView } from "react-native-gesture-handler"

export default function SpecificCourseScreen({ route }: MenuProps<"SpecificCourseScreen">): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { localTitle } = useSelector((state: ReduxState) => state.misc)
    const [refresh, setRefresh] = useState(false)
    const [course, setCourse] = useState<Course | string>("")
    const [clicked, setClicked] = useState<number[]>([])
    const dispatch = useDispatch()

    if (route.params.courseID !== localTitle?.title) {
        dispatch(setLocalTitle({title: route.params.courseID, screen: "SpecificCourseScreen"}))
    }

    async function fetchCourse() {
        const course = await getCourse(route.params.courseID)

        if (course) {
            setCourse(course)
            return true
        }
    }

    useEffect(() => {
        (async () => {
           await fetchCourse()
        })()
    }, [])

    const onRefresh = useCallback(async () => {
        setRefresh(true)
        const course = await fetchCourse()
        
        if (course) {
            setClicked([])
            setRefresh(false)
        }
    }, [refresh])


    return (
        <Parent paddingHorizontal={-1}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
                style={{paddingVertical: 10, bottom: 10}}
            >
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            {typeof course === 'string' 
                ? <Text style={{ fontSize: 18, color: theme.textColor }}>{course}</Text> 
                : <Swipeable
                    course={course} 
                    clicked={clicked} 
                    setClicked={setClicked} 
                />
            }
            </ScrollView>
        </Parent>
    )
}
