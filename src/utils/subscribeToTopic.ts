import messaging from "@react-native-firebase/messaging"

/**
 * Subscribes the user to the passed topic
 * @param topic topic to subscribe to
 */
export default async function subscribeToTopic(topic: string) {
    try {
        await messaging().subscribeToTopic(topic);
        return { result: true, feedback: `Subscribed to ${topic}`}
    } catch (e: any) {
        if (e.message.includes('TOO_MANY_SUBSCRIBERS')) {
            return { result: false, feedback: `Too many subscribers for topic: ${topic}`}
        } else {
            return { result: false, feedback: `Subscription to topic failed: ${e}`}
        }
    }
}
