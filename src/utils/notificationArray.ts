type notificationArrayProps = {
    notification: NotificationProps
    category: CategoryProps
}

export default function notificationArray({notification, category}: notificationArrayProps) {
    const committees = ["tekkom", "social", "ctf", "karrieredag", "fadderuka", "bedpres", "login", "annet"]
    const intervals = ["10m", "30m", "1h", "2h", "3h", "6h", "1d", "2d", "1w"]
    const index = committees.indexOf(category)
    let array = []

    for (let i = 0; i < intervals.length; i++) {
        const id = committees[index] + intervals[i]
        notification[id] ? array.push(true) : array.push(false)
    }

    return array
}
