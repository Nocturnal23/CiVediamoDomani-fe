import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {CategoryDto} from "../dto/category-dto";
import {CategoryCriteria} from "../criteria/category-criteria";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CategoryService implements AbstractService<CategoryDto, CategoryCriteria> {
    private baseUrl: string;

    constructor(private _http: HttpClient) {
        this.baseUrl = environment.BE_URL + '/categories'
    }

    get(id: number | string): Observable<CategoryDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<CategoryDto>(url);
    }

    filter(criteria: CategoryCriteria): Observable<Page<CategoryDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<CategoryDto>>(url, criteria);
    }
}
