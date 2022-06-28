import {BaseDto} from "./base-dto";
import {AdvertDto} from "./advert-dto";

export interface CategoryDto extends BaseDto {
  name ?: string;

  adverts ?: Array<AdvertDto>;
}
