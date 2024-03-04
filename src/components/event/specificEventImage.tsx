import { StaticImage } from "@components/about/social"
import Skeleton from "@components/shared/skelleton"
import ES from "@styles/eventStyles"
import { Dimensions, Image } from "react-native"
import { SvgUri } from "react-native-svg"
import { useSelector } from "react-redux"

export default function SpecificEventImage() {
    const { event } = useSelector((state: ReduxState) => state.event)
    if (!event.event) return <Skeleton loading={true} height={160} callback={()=>{
        if ((event.event.image_small).includes(".svg")) {
            return (
                <SvgUri
                    style={{alignSelf: "center", marginTop: 8}}
                    width={(Dimensions.get("window").width)/1.2}
                    height={Dimensions.get("window").width/3}
                    uri={`https://cdn.login.no/img/events/${event.event.image_small}`}
                />
            )
        } else if (event.event.image_small.includes(".png")){
            return <Image
                style={ES.specificEventImage}
                source={{uri: `https://cdn.login.no/img/events/${event.event.image_small}`}}
            />
        } else {
            return <StaticImage event={event} />
        }
    }}/>

}