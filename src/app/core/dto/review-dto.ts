import {BaseDto} from "./base-dto";
import {UserDto} from "./user-dto";
import {AdvertDto} from "./advert-dto";

export interface ReviewDto extends BaseDto {
  sender ?: UserDto;

  recipient ?: AdvertDto;

  rating ?: number;

  description ?: string;
}
