import {BaseCriteria} from "./base-criteria";

export interface CategoryCriteria extends BaseCriteria {
    fatherID?: number
    childCategorySearch?: string
}
