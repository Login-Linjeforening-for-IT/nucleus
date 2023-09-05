import FetchColor from 'login/styles/fetchTheme';
import { CS } from 'login/styles/clusterStyles';
import { ES } from 'login/styles/eventStyles';
import { useSelector } from 'react-redux';
import { View, Image } from 'react-native';

/**
 * Card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Cluster (props) {
    const { theme } = useSelector( (state) => state.theme )
    const noColor = props.noColor

    return(
        <View style={{...ES.cluster, backgroundColor: !noColor ? FetchColor(theme, 'DARKER') : null}}>
            <View style={props.space ? {...ES.clusterContent, marginVertical: props.space} : ES.clusterContent}>
                { props.children }
            </View>
        </View>
    );
};

/**
 * Smaller cluster function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the cluster
 * @returns             Cluster with the props inside
 */
export function ClusterSmaller (props) {
    
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...ES.clusterSmaller, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View>
                { props.children }
            </View>
        </View>
    );
};

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function ClusterArrow() {
    return(
        <View style={CS.arrowView}>
            <Image style={CS.arrowImage} source={require('login/assets/icons/goback777.png')}/>
        </View>
    );
};