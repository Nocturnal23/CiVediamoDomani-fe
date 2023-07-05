import {BaseCriteria} from "./base-criteria";

export interface EventCriteria extends BaseCriteria {
    searchValue?: string
    organiserId?: number
    followerId?: number
    attendeeId?: number
    category?: string
}
