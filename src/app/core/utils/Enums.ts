export enum RoleEnums {
    ADMIN_ROLE = 1,
    NORMAL_ROLE = 2,
}

export enum UserStateEnums {
    DISABLE = "DISABILITATO",
    ENABLE = "ATTIVO"
}

export enum RoutingEnums{
    LOGIN = 'login',
    HOMEPAGE = 'homepage',

    USER = 'user',

    PROFILE = `profile`,
    USER_PROFILE = '/user/profile',

    EVENTS = 'events',
    USER_EVENTS = '/user/events',

    SETTINGS = 'settings',
    USER_SETTINGS = '/user/settings',

    DASHBOARD = 'dashboard'
}
