import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {ReviewDto} from "../dto/review-dto";
import {ReviewCriteria} from "../criteria/review-criteria";

@Injectable({ providedIn: 'root' })
export class ReviewService implements AbstractService<ReviewDto, ReviewCriteria> {
    private baseUrl: string;

    constructor(private _http: HttpClient) {
        this.baseUrl = '/reviews'
    }

    get(id: number | string): Observable<ReviewDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<ReviewDto>(url);
    }

    filter(criteria: ReviewCriteria): Observable<Page<ReviewDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<ReviewDto>>(url, criteria);
    }
}
