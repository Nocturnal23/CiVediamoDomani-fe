import {BaseDto} from "./base-dto";

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

  searchLocation ?: string;

  searchLatitude ?: string;

  searchLongitude ?: string;
}
