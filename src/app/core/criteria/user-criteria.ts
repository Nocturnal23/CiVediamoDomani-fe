import {BaseCriteria} from "./base-criteria";

export interface UserCriteria extends BaseCriteria {
    firstNameSearch?: string
    lastNameSearch?: string
}
