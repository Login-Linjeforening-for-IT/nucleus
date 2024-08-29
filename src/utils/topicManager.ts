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
    console.log('1')
    try {
        console.log('2')
        const granted = await messaging().requestPermission()
        console.log('3')
        
        if (!granted) {
            console.log('4')
            console.log("You must enable notifications for this feature.")
            return { result: false, feedback: 'You must enable notifications for this feature.'}
        }
        console.log('5')
        
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
        console.log('6')
        
        const result = await subscribeToTopic(topic)
        console.log('result:', result)
        return result
    } catch (error: unknown) {
        console.log('7')
        if (typeof error === 'string') return { result: false, feedback: error}
        if (typeof error === 'object' && error != null) return { result: false, feedback: error.toString()}
        if (Array.isArray(error)) return { result: false, feedback: error.join()}
        
        return { result: false, feedback: 'Result was an error, but the error was too dangerous to be displayed.'}
    }
}
