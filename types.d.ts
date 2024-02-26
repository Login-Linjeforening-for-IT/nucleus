// Configured in this file to be globally accessable.
declare module '*.svg' {
    const content: string;
    export default content;
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

type DetailedEventResponse = {
    event: DetailedEvent
    category: Category
    organizations: Organization[]
    audiences: Audience[]
}

type Organization = {
    shortname: string | null
    logo: string
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    link_homepage: string
    link_linkedin: string
    link_facebook: string
    link_instagram: string
}

type Audience = {
    id: number
    name_no: string
    name_en: string
    description_no: string
    description_en: string
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
        calendarID: string
    }
    notification: NotificationProps
    profile: ProfileProps
    event: {
        events: EventProps[]
        event: DetailedEvent
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
    }
    ad: {
        ads: AdProps[]
        ad: DetailedAd
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
    skills: string[]
    cities: string[]
}

type ExtraAdProps = {
    visible: boolean
    description_short_no: string
    description_short_en: string
    description_long_no: string
    description_long_en: string
    banner_image: string
    organization: string
    application_url: string
    updated_at: string
    created_at: string
    deleted_at: string
}

type AdOrganizationProps = {
    shortname: string
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    link_homepage: string
    link_linkedin: string
    link_facebook: string
    link_instagram: string
    logo: string
    updated_at: string
    created_at: string
    deleted_at: string
  }

type DetailedAd = AdProps & ExtraAdProps & AdOrganizationProps

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

type DetailedEvent = {
    id: number
    visible: boolean
    name_no: string
    name_en: string
    description_no: string
    description_en: string
    informational_no: string
    informational_en: string
    time_type: string
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
    location: string | null,
    parent: null,
    rule: string | null,
    updated_at: string
    created_at: string
    deleted_at: string
    category_name_no: string
    category_name_en: string
    audiences: string[]
    category_id: number
    category_color: string
    category_name_no: string
    category_name_en: string
    mazeref: string
    location_no: string
    location_en: string
    location_url: string
    organization_name_short: string
    organization_name_en: string
    organization_logo: string
    link_homepage: string
    rule_no: string
    rule_en: string
    rule_details_no: string
    rule_details_en: string
    color: string
}

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

    // Notification categories
    SETUP:              boolean[]
    IMPORTANT:          boolean[]
    TEKKOM:             boolean[]
    CTF:                boolean[]
    SOCIAL:             boolean[]
    BEDPRES:            boolean[]
    KARRIEREDAG:        boolean[]
    FADDERUKA:          boolean[]
    LOGIN:              boolean[]
    ANNET:              boolean[]

    // TekKom
    tekkom10m:          boolean[]
    tekkom30m:          boolean[]
    tekkom1h:           boolean[]
    tekkom2h:           boolean[]
    tekkom3h:           boolean[]
    tekkom6h:           boolean[]
    tekkom1d:           boolean[]
    tekkom2d:           boolean[]

    // Ctf
    ctf10m:             boolean[]
    ctf30m:             boolean[]
    ctf1h:              boolean[]
    ctf2h:              boolean[]
    ctf3h:              boolean[]
    ctf6h:              boolean[]
    ctf1d:              boolean[]
    ctf2d:              boolean[]

    // Social
    social10m:          boolean[]
    social30m:          boolean[]
    social1h:           boolean[]
    social2h:           boolean[]
    social3h:           boolean[]
    social6h:           boolean[]
    social1d:           boolean[]
    social2d:           boolean[]
    social1w:           boolean[]

    // Karrieredag
    karrieredag10m:     boolean[]
    karrieredag30m:     boolean[]
    karrieredag1h:      boolean[]
    karrieredag2h:      boolean[]
    karrieredag3h:      boolean[]
    karrieredag6h:      boolean[]
    karrieredag1d:      boolean[]
    karrieredag2d:      boolean[]
    karrieredag1w:      boolean[]

    // Fadderuka
    fadderuka10m:       boolean[]
    fadderuka30m:       boolean[]
    fadderuka1h:        boolean[]
    fadderuka2h:        boolean[]
    fadderuka3h:        boolean[]
    fadderuka6h:        boolean[]
    fadderuka1d:        boolean[]
    fadderuka2d:        boolean[]
    fadderuka1w:        boolean[]

    // Bedpres
    bedpres10m:         boolean[]
    bedpres30m:         boolean[]
    bedpres1h:          boolean[]
    bedpres2h:          boolean[]
    bedpres3h:          boolean[]
    bedpres6h:          boolean[]
    bedpres1d:          boolean[]
    bedpres2d:          boolean[]
    bedpres1w:          boolean[]

    // Login
    login10m:           boolean[]
    login30m:           boolean[]
    login1h:            boolean[]
    login2h:            boolean[]
    login3h:            boolean[]
    login6h:            boolean[]
    login1d:            boolean[]
    login2d:            boolean[]
    login1w:            boolean[]

    // Annet
    annet10m:           boolean[]
    annet30m:           boolean[]
    annet1h:            boolean[]
    annet2h:            boolean[]
    annet3h:            boolean[]
    annet6h:            boolean[]
    annet1d:            boolean[]
    annet2d:            boolean[]
    annet1w:            boolean[]

    // Key used for indexing
    [key: string]:      boolean[]
}

type ObjectifiedNotificationProps = {
    annet: {
      annet10m: boolean[],
      annet1d: boolean[],
      annet1h: boolean[],
      annet1w: boolean[],
      annet2d: boolean[],
      annet2h: boolean[],
      annet30m: boolean[],
      annet3h: boolean[],
      annet6h: boolean[]
    },
    bedpres: {
      bedpres10m: boolean[],
      bedpres1d: boolean[],
      bedpres1h: boolean[],
      bedpres1w: boolean[],
      bedpres2d: boolean[],
      bedpres2h: boolean[],
      bedpres30m: boolean[],
      bedpres3h: boolean[],
      bedpres6h: boolean[]
    },
    ctf: {
      ctf10m: boolean[],
      ctf1d: boolean[],
      ctf1h: boolean[],
      ctf2d: boolean[],
      ctf2h: boolean[],
      ctf30m: boolean[],
      ctf3h: boolean[],
      ctf6h: boolean[]
    },
    fadderuka: {
      fadderuka10m: boolean[],
      fadderuka1d: boolean[],
      fadderuka1h: boolean[],
      fadderuka1w: boolean[],
      fadderuka2d: boolean[],
      fadderuka2h: boolean[],
      fadderuka30m: boolean[],
      fadderuka3h: boolean[],
      fadderuka6h: boolean[]
    },
    important: {},
    karrieredag: {
      karrieredag10m: boolean[],
      karrieredag1d: boolean[],
      karrieredag1h: boolean[],
      karrieredag1w: boolean[],
      karrieredag2d: boolean[],
      karrieredag2h: boolean[],
      karrieredag30m: boolean[],
      karrieredag3h: boolean[],
      karrieredag6h: boolean[]
    },
    login: {
      login10m: boolean[],
      login1d: boolean[],
      login1h: boolean[],
      login1w: boolean[],
      login2d: boolean[],
      login2h: boolean[],
      login30m: boolean[],
      login3h: boolean[],
      login6h: boolean[]
    },
    setup: {},
    social: {
      social10m: boolean[],
      social1d: boolean[],
      social1h: boolean[],
      social1w: boolean[],
      social2d: boolean[],
      social2h: boolean[],
      social30m: boolean[],
      social3h: boolean[],
      social6h: boolean[]
    }
    
     // Key used for indexing
    [key: string]: any
  }

  
type NotificationList = {
    title: string
    body: string
    data: DetailedEvent
    time: string
}

type EventStackParamList = {
    EventScreen: undefined
    SpecificEventScreen: undefined
}

type AdStackParamList = {
    AdScreen: undefined
    SpecificAdScreen: undefined
}

type Setting = {
    screen: string;
    nav: string;
    setting: 
        {
            id: number;
            nav: MenuRoutes;
            title: string
        }[]
}

type MenuRoutes = 
    "ProfileScreen"
    | "SettingScreen"
    | "NotificationScreen"
    | "AboutScreen"
    | "BusinessScreen"
    | "ReportScreen"
    | "LoginScreen"
    | "InternalScreen" 

type ItemProps = {
    id: number
    nav: MenuRoutes
    title: string
}

type MenuStackParamList = {
    [k in MenuRoutes]+?: ItemProps;
} & {MenuScreen: undefined}

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
