// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6
import messaging from "@react-native-firebase/messaging"
import subscribeToTopic from "@utils/subscribeToTopic"
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6

type TopicManagerProps = {
    topic: string
    unsub?: boolean
}

/**
 * **Function for subscribing and unsubscribing from notification topics**
 *
 * When changing language it will setup notifications to follow language.
 *
 * @param topicID Topic identifier - "langChange" passed when changing language
 * @param lang Language, 1 for norwegian, 0 for english
 * @param status  true/false Subscribe or unsubscribe from given topic.
 */
export default async function TopicManager({topic, unsub}: TopicManagerProps) {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
    // return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
    try {
        const granted = await messaging().requestPermission()
    
        if (granted) {
            if (unsub) {
                await messaging().unsubscribeFromTopic(topic)
                return { result: true, feedback: `Unsubscribed from ${topic}`}
            } 
            
            return await subscribeToTopic(topic)
        }

        return { result: false, feedback: 'Result escaped logs.'}
    } catch (error: unknown) {
        if (typeof error === 'string') return { result: false, feedback: error}
        if (typeof error === 'object' && error != null) return { result: false, feedback: error.toString()}
        if (Array.isArray(error)) return { result: false, feedback: error.join()}
        
        return { result: false, feedback: 'Result was an error, but the error was too dangerous to be displayed.'}
    }
}
