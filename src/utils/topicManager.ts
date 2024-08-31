import messaging from "@react-native-firebase/messaging"
import subscribeToTopic from "@utils/subscribeToTopic"

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
    try {
        const granted = await messaging().requestPermission()
        
        if (!granted) {
            return { result: false, feedback: 'You must enable notifications for this feature.'}
        }
        
        if (unsub) {
            if (topic.includes(',')) {
                const topics = topic.split(',')
                for (const topic of topics) {
                    await messaging().unsubscribeFromTopic(topic)
                }
            } else {
                await messaging().unsubscribeFromTopic(topic)
            }
            
            return { result: true, feedback: `Unsubscribed from ${topic}`}
        } 
        
        const result = await subscribeToTopic(topic)
        return result
    } catch (error: unknown) {
        if (typeof error === 'string') return { result: false, feedback: error}
        if (typeof error === 'object' && error != null) return { result: false, feedback: error.toString()}
        if (Array.isArray(error)) return { result: false, feedback: error.join()}
        
        return { result: false, feedback: 'Result was an error, but the error was too dangerous to be displayed.'}
    }
}
