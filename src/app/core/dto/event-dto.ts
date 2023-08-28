import {BaseDto} from "./base-dto";
import {UserDto} from "./user-dto";
import {CategoryDto} from "./category-dto";

export interface EventDto extends BaseDto {
  organiser ?: UserDto;

  title ?: string;

  place ?: string;

  coordinates ?: string;

  datetime ?: Date;

  description ?: string;

  price ?: number;

  image ?: string;

  categories ?: Array<CategoryDto>;

  attendees ?: Array<string>;

  followers ?: Array<string>;
}
