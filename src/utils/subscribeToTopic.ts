// COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
import messaging from "@react-native-firebase/messaging"
// COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6

export default async function subscribeToTopic(topic: string) {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
    return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6

    try {
        await messaging().subscribeToTopic(topic);
        console.log("Subscribed to:", topic);
    } catch (e: any) {
        if (e.message.includes('TOO_MANY_SUBSCRIBERS')) {
            console.warn('Too many subscribers for topic:', topic);
        } else {
            console.error('Subscription to topic failed:', e);
        }
    }
}
