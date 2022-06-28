import {BaseDto} from "./base-dto";
import {AdvertDto} from "./advert-dto";
import {ReviewDto} from "./review-dto";

export interface UserDto extends BaseDto{
  firstName ?: string;

  lastName ?: string;

  email ?: string;

  phoneNum ?: string;

  birthday ?: string;

  city ?: string;

  country ?: string;

  appRole ?: number;

  postedAds ?: Array<AdvertDto>;

  savedAds ?: Array<AdvertDto>;

  postedReviews ?: Array<ReviewDto>;
}
