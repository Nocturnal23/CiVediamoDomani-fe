import {BaseCriteria} from "./base-criteria";

export interface EventCriteria extends BaseCriteria {
    eventTitle?: string
    organiserId?: number
    followerId?: number
    attendeeId?: number
    categories?: Array<string>
}
