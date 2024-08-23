import { MenuProps } from "@type/screenTypes"
import { useDispatch, useSelector } from "react-redux"
import Parent from "@components/shared/parent"
import { getCourse } from "@utils/course"
import ThumbsUp from "@components/course/thumbsUp"
import ThumbsDown from "@components/course/thumbsDown"
import { setLocalTitle } from "@redux/misc"
import Markdown from "@components/course/markdown"
import { 
    Dispatch, 
    SetStateAction, 
    useCallback, 
    useEffect, 
    useState 
} from "react"
import { 
    Dimensions, 
    RefreshControl, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View,
} from "react-native"
import ReadOnly from "@components/course/readonly"
import Swipeable from "@components/course/swipeable"

export default function SpecificCourseScreen({ route }: MenuProps<"SpecificCourseScreen">): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { localTitle } = useSelector((state: ReduxState) => state.misc)
    const [refresh, setRefresh] = useState(false)
    const [course, setCourse] = useState<Course | string>("")
    const [clicked, setClicked] = useState<number[]>([])
    const dispatch = useDispatch()
    
    if (route.params.courseID !== localTitle.title) {
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
        <Parent left="CourseScreen" paddingHorizontal={6}>
            <ScrollView
                showsVerticalScrollIndicator={false} 
                scrollEventThrottle={100}
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
