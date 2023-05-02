import {BaseDto} from "./base-dto";
import {CategoryDto} from "./category-dto";

export interface UserDto extends BaseDto{
  email ?: string;

  password ?: string;

  firstName ?: string;

  lastName ?: string;

  appRole ?: number;

  organisedEvents ?: number;

  favorites ?: number;

  attending ?: number;

  categories ?: Array<CategoryDto>;
}
