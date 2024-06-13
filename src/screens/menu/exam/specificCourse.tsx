import { ExamScreenProps } from "@type/screenTypes";
import { Text, View } from "react-native";

export default function SpecificCourse({ route }: ExamScreenProps<"SpecificCourseScreen">): JSX.Element {
    return (
        <View>
            <Text>Specific Course</Text>
        </View>
    )
}