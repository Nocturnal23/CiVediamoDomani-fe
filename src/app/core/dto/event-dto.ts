import {BaseDto} from "./base-dto";
import {UserDto} from "./user-dto";
import {CategoryDto} from "./category-dto";

export interface EventDto extends BaseDto {
  organiser ?: UserDto;

  title ?: string;

  place ?: string;

  coordinates ?: string;

  dateTime ?: Date;

  description ?: string;

  price ?: number;

  categories ?: Array<CategoryDto>;

  attendes ?: number;

  followers ?: number;
}
