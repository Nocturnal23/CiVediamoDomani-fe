import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {AdvertDto} from "../dto/advert-dto";
import {AdvertCriteria} from "../criteria/advert-criteria";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";

@Injectable({ providedIn: 'root' })
export class AdvertService implements AbstractService<AdvertDto, AdvertCriteria> {
    private baseUrl: string;

    constructor(private _http: HttpClient) {
        this.baseUrl = '/adverts'
    }

    get(id: number | string): Observable<AdvertDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<AdvertDto>(url);
    }

    filter(criteria: AdvertCriteria): Observable<Page<AdvertDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<AdvertDto>>(url, criteria);
    }
}
