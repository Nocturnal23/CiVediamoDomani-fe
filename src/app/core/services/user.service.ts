import {AbstractService} from "./abstract.service";
import {UserCriteria} from "../criteria/user-criteria";
import {UserDto} from "../dto/user-dto";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService implements AbstractService<UserDto, UserCriteria> {
    private baseUrl: string;

    constructor(
        private _http: HttpClient) {
        this.baseUrl = environment.BE_URL + '/users';
    }

    get(id: number | string): Observable<UserDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<UserDto>(url);
    }

    filter(criteria: UserCriteria): Observable<Page<UserDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<UserDto>>(url, criteria);
    }
}
