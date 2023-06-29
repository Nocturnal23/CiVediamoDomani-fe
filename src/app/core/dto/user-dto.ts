import {BaseDto} from "./base-dto";
import {CategoryDto} from "./category-dto";

export interface UserDto extends BaseDto{
  state ?: string;

  email ?: string;

  password ?: string;

  firstName ?: string;

  lastName ?: string;

  appRole ?: number;

  organisedEvents ?: Array<string>;

  favorites ?: Array<string>;

  attending ?: Array<string>;

  categories ?: Array<CategoryDto>;
}
