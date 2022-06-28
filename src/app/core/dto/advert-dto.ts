import {BaseDto} from "./base-dto";
import {UserDto} from "./user-dto";
import {ReviewDto} from "./review-dto";
import {CategoryDto} from "./category-dto";

export interface AdvertDto extends BaseDto {
  advertiser ?: UserDto;

  address ?: string;

  city ?: string

  country ?: string;

  constructionYear ?: string;

  placeCondition ?: string;

  floor ?: number;

  squareMeters ?: number;

  noLocals ?: number;

  noBathrooms ?: number;

  title ?: string;

  description ?: string;

  price ?: number;

  discountPrice ?: number;

  advType ?: number;

  sellerType ?: number;

  parking ?: number;

  media ?: string;

  review ?: Array<ReviewDto>;

  heatingType ?: number;

  energeticClass ?: number;

  details ?: string;

  category ?: CategoryDto;
}
