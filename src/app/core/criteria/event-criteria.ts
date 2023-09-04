import {BaseCriteria} from "./base-criteria";

export interface EventCriteria extends BaseCriteria {
    eventTitle?: Array<string>
    organiserId?: number
    followerId?: number
    attendeeId?: number
    categories?: Array<string>
    eventDate?: Date
}
