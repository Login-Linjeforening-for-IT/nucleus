import { StaticImage } from "@components/about/social"
import Skeleton from "@components/shared/skeleton"
import ES from "@styles/eventStyles"
import { Dimensions, Image, View } from "react-native"
import { SvgUri } from "react-native-svg"
import { useSelector } from "react-redux"

export default function SpecificEventImage() {
    const { event } = useSelector((state: ReduxState) => state.event)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    if (event?.event) {
        if ((event.event.image_small)?.includes(".svg")) {
            return (
                <SvgUri
                    style={{alignSelf: "center", marginTop: 8}}
                    width={(Dimensions.get("window").width)/1.2}
                    height={Dimensions.get("window").width/3}
                    uri={`https://cdn.login.no/img/events/banner/${event.event.image_small}`}
                />
            )
        }
    
        if (event.event.image_small?.includes(".png")) {
            return <Image
                style={ES.specificEventImage}
                source={{uri: `https://cdn.login.no/img/events/banner/${event.event.image_small}`}}
            />
        }
    
        return <StaticImage category={event.category.name_no} />
    }
    
    return (
        <View style={{backgroundColor: theme.darker}}>
            <Skeleton loading={true} height={150} noColor={true} />
        </View>
    )

}