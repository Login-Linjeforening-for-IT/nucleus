type EventProps = {
    eventID: number
    parent: number
    organizer: string
    eventname: string
    startt: string
    audience: string
    category: CategoryProps
    image: string
    fblink: string
    discordlink: string
    roomno: string
    campus: string
    street: string
    postcode: number
    city: string
}

type DetailedProps = {
    endt: string
    publisht: string
    description: string
    organizerlogo: string
    organizerlink: string
    mazeref: string
}

type DetailedEventProps = EventProps & DetailedProps

type ReduxState = {
    theme: {
        theme: number
    }
    login: {
        login: boolean
    }
    lang: {
        lang: boolean
    }
    misc: {
        calendarID: string
    }
    notification: NotificationProps
    profile: ProfileProps
}

type ProfileProps = any

type AdProps = {
    id: number
    title_no: string
    title_en: string
    position_title_no: string
    position_title_en: string
    description_short_no: string
    description_short_en: string
    description_long_no: string
    description_long_en: string
    job_type: string
    application_deadline: string
    banner_image: string
    organization: string
    application_url: string
    created_at: string
    updated_at: string
    shortname: string
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    link_homepage: string
    link_linkedin: string
    link_facebook: string
    link_instagram: string
    link_discord: string
    logo: string
    city: string
    skill: string
}

type CategoryProps = "tekkom" | "social" | "ctf" | "karrieredag" | "fadderuka" |
    "bedpres" | "login" | "annet" | "TEKKOM" | "SOCIAL" | "CTF" | "KARRIEREDAG" |
    "FADDERUKA" | "BEDPRES" | "LOGIN" | "ANNET"

type Interval = NodeJS.Timeout | number

type SettingProps = {
    id: number
    nav: string
    title: string
}

type ErrorMessageProps = {
    argument: "wifi" | "nomatch"
}

type CategoryWithID = {
    category: string
    id: number
}

type CTX = {
    startY: number
}

type RootStackParamList = {
    SpecificEventScreen: { item: EventProps }
    SpecificAdScreen: { item: AdProps}
}

type NotificationProps = {

    // Notification categories
    SETUP:              boolean
    IMPORTANT:          boolean
    TEKKOM:             boolean
    CTF:                boolean
    SOCIAL:             boolean
    BEDPRES:            boolean
    KARRIEREDAG:        boolean
    FADDERUKA:          boolean
    LOGIN:              boolean
    ANNET:              boolean

    // TekKom
    tekkom10m:          boolean
    tekkom30m:          boolean
    tekkom1h:           boolean
    tekkom2h:           boolean
    tekkom3h:           boolean
    tekkom6h:           boolean
    tekkom1d:           boolean
    tekkom2d:           boolean

    // Ctf
    ctf10m:             boolean
    ctf30m:             boolean
    ctf1h:              boolean
    ctf2h:              boolean
    ctf3h:              boolean
    ctf6h:              boolean
    ctf1d:              boolean
    ctf2d:              boolean

    // Social
    social10m:          boolean
    social30m:          boolean
    social1h:           boolean
    social2h:           boolean
    social3h:           boolean
    social6h:           boolean
    social1d:           boolean
    social2d:           boolean
    social1w:           boolean

    // Karrieredag
    karrieredag10m:     boolean
    karrieredag30m:     boolean
    karrieredag1h:      boolean
    karrieredag2h:      boolean
    karrieredag3h:      boolean
    karrieredag6h:      boolean
    karrieredag1d:      boolean
    karrieredag2d:      boolean
    karrieredag1w:      boolean

    // Fadderuka
    fadderuka10m:       boolean
    fadderuka30m:       boolean
    fadderuka1h:        boolean
    fadderuka2h:        boolean
    fadderuka3h:        boolean
    fadderuka6h:        boolean
    fadderuka1d:        boolean
    fadderuka2d:        boolean
    fadderuka1w:        boolean

    // Bedpres
    bedpres10m:         boolean
    bedpres30m:         boolean
    bedpres1h:          boolean
    bedpres2h:          boolean
    bedpres3h:          boolean
    bedpres6h:          boolean
    bedpres1d:          boolean
    bedpres2d:          boolean
    bedpres1w:          boolean

    // Login
    login10m:           boolean
    login30m:           boolean
    login1h:            boolean
    login2h:            boolean
    login3h:            boolean
    login6h:            boolean
    login1d:            boolean
    login2d:            boolean
    login1w:            boolean

    // Annet
    annet10m:           boolean
    annet30m:           boolean
    annet1h:            boolean
    annet2h:            boolean
    annet3h:            boolean
    annet6h:            boolean
    annet1d:            boolean
    annet2d:            boolean
    annet1w:            boolean

    // Key used for indexing
    [key: string]:      boolean
}

type NotificationList = {
    title: string
    body: string
    data: DetailedEventProps
    time: string
}

type EventStackParamList = {
    root: undefined
    SpecificEventScreen: {item: EventProps}
}
