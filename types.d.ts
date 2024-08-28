// Configured in this file to be globally accessable.
declare module '*.svg' {
    const content: string
    export default content
}

// Types globally used in the app

type EventProps = {
    id: number
    name_no: string
    name_en: string
    highlight: boolean
    canceled: boolean
    full: boolean
    time_type: string
    time_start: string
    time_end: string
    time_publish: string
    image_small: string
    location_name_no: string
    location_name_en: string
    category_color: string
    category_name_no: string
    category_name_en: string
}

type DetailedEventData = {
    id: number
    visible: boolean
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    informational_no: string
    informational_en: string
    time_type: 'default' | 'no_end' | 'whole_day' | 'tbd'
    time_start: string
    time_end: string
    time_publish: string
    time_signup_release: string
    time_signup_deadline: string
    canceled: boolean
    digital: boolean
    highlight: boolean
    image_small: string
    image_banner: string
    link_facebook: string
    link_discord: string
    link_signup: string
    link_stream: string
    capacity: number | null
    full: boolean
    category: number
    location: number | null,
    parent: number | null,
    rule: number | null,
    updated_at: string
    created_at: string
    deleted_at: string
}

type DetailedEventResponse = {
    event: DetailedEventData
    category: Category
    location: EventLocation | undefined
    rule: Rule | undefined
    organizations: Organization[]
    audiences: Audience[]
} | undefined

type DetailedAd = {
    id: number
    visible: boolean
    highlight: boolean
    title_no: string
    title_en: string
    position_title_no: string
    position_title_en: string
    description_short_no: string
    description_short_en: string
    description_long_no: string
    description_long_en: string
    job_type: 'full' | 'part' | 'summer' | 'verv'
    time_publish: string
    time_expire: string
    application_deadline: string
    banner_image: string
    organization: number
    application_url: string
    updated_at: string
    created_at: string
    deleted_at: string
    skills: string[] | undefined
    cities: string[] | undefined
}

type DetailedAdResponse = {
    job: DetailedAd
    organization: Organization
} | undefined

type EventLocation = {
    id: number
    name_no: string
    name_en: string
    type: 'mazemap' | 'coords' | 'address' | 'none'
    mazemap_campus_id: number | null
    mazemap_poi_id: number | null
    address_street: string 
    address_postcode: number | null
    city_name: string
    coordinate_lat: number | null
    coordinate_lang: number | null
    url: string
    updated_at: string
    created_at: string
    deleted_at: string
}

type Rule = {
    id: number
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    updated_at: string
    created_at: string
    deleted_at: string
}

type Organization = {
    shortname: string
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    type: string
    link_homepage: string
    link_linkedin: string
    link_facebook: string
    link_instagram: string
    logo: string
    created_at: string
    updated_at: string
    deleted_at: string
}

type Audience = {
    id: number
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    created_at: string
    updated_at: string
    deleted_at: string
}

type Category = {
    id: number
    color: string
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    updated_at: string
    created_at: string
}

type AdProps = {
    id: number
    highlight: boolean
    title_no: string
    title_en: string
    position_title_no: string
    position_title_en: string
    job_type: string
    time_publish: string
    application_deadline: string
    organization_shortname: string
    organization_name_no: string
    organization_name_en: string
    organization_logo: string
    skills: string[] | undefined
    cities: string[] | undefined
}


type ReduxState = {
    theme: {
        value: number
        isDark: boolean
        theme: Theme
    }
    login: {
        login: boolean
    }
    lang: {
        lang: boolean
    }
    misc: {
        localTitle: { 
            title: string
            screen: string 
        }
        calendarID: string
    }
    notification: NotificationProps
    profile: ProfileProps
    event: {
        events: EventProps[]
        event: DetailedEventResponse
        history: number[]
        clickedEvents: EventProps[]
        renderedEvents: EventProps[]
        lastFetch: string
        lastSave: string
        search: boolean
        categories: {
            no: string[]
            en: string[]
        }
        clickedCategories: string[]
        input: string
        downloadState: Date
        tag: {
            title: string
            body: string
        }
        notification: NotificationModal
    }
    ad: {
        ads: AdProps[]
        ad: DetailedAdResponse
        history: number[]
        clickedAds: AdProps[]
        renderedAds: AdProps[]
        lastFetch: string
        lastSave: string
        search: boolean
        skills: string[]
        clickedSkills: string[]
        input: string
        downloadState: Date
    }
}

type ProfileProps = any

type CategoryProps = 
    "tekkom"
    | "social"
    | "ctf"
    | "karrieredag"
    | "fadderuka"
    | "bedpres"
    | "login"
    | "annet"
    | "TEKKOM"
    | "SOCIAL"
    | "CTF"
    | "KARRIEREDAG"
    | "FADDERUKA"
    | "BEDPRES"
    | "LOGIN"
    | "ANNET"

type Interval = NodeJS.Timeout | number

type SettingProps = {
    id: number
    nav: string
    title: string
}

type CTX = {
    startY: number
}

type NotificationProps = {

    // Boolean for whether notifications has been allowed
    allowed:              boolean
    
    // Category - (10m, 30m, 1h, 2h, 3h, 6h, 1d, 2d, 1w)
    tekkom:             boolean[]
    ctf:                boolean[]
    social:             boolean[]
    karrieredag:        boolean[]
    fadderuka:          boolean[]
    bedpres:            boolean[]
    login:              boolean[]
    annet:              boolean[]

    // Key used for indexing
    [key: string]:      boolean[]
}
  
type NotificationListProps = {
    title: string
    body: string
    data: DetailedEvent
    time: string
    id: number
    read?: boolean
}

type Setting = {
    screen: string
    nav: string
    setting: 
        {
            id: number
            nav: MenuRoutes
            title: string
        }[]
}

type ListFooterProps = {
    index: number
}

type Theme = {
    background: string
    darker: string
    contrast: string
    transparent: string
    transparentAndroid: string
    orange: string
    discord: string
    textColor: string
    titleTextColor: string
    oppositeTextColor: string
    switchOnState: string
    switchOffState: string
    trackColor: string
    trackBackgroundColor: string
    dark: string
}

type Status = {
    token: string
    topics: string[]
}

type TopicManagerResult = {
    result: boolean
    feedback: string
}

type Tag = {
    title: string
    body: string
}

type NotificationModal = {
    title: string
    body: string
    data: any
}

type Editing = {
    cards: Card[]
    texts: string[]
}

type Card = {
    question: string
    alternatives: string[]
    source: string
    correct: number[]
    help?: string
    theme?: string
    rating: number
    votes: Vote[]
}

type User = {
    name: string
    username: string
    time: number
    score: number
    solved: UserSolved[]
}

type Vote = {
    username: string
    vote: boolean
}

type CourseAsList = {
    id: string
    cards: Card[]
    count: number
}

type Course = {
    id: string
    cards: Card[]
    unreviewed: Card[]
    textUnreviewed: string[]
    mark?: boolean
}

type Game = {
    id: number
    name: string
    endpoint: string
    description_no: string
    description_en: string
}

type Question = {
    id: number
    title_no: string
    title_en: string
    categories: string[]
}

type NeverHaveIEver = {
    id: number
    title_no: string
    title_en: string
    categories: string[]
}

type OkRedFlagDealBreaker = {
    id: number
    title_no: string
    title_en: string
}
