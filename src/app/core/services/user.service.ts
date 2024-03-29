import {AbstractService} from "./abstract.service";
import {UserCriteria} from "../criteria/user-criteria";
import {UserDto} from "../dto/user-dto";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class UserService implements AbstractService<UserDto, UserCriteria> {
    private baseUrl: string;

    constructor(
        private _http: HttpClient) {
        this.baseUrl = environment.BE_URL + '/users';
    }

    delete(url: string): Observable<any> {
        return this._http.delete<any>(`${this.baseUrl}/${url}`);
    }

    disableUser(uniqueUrl: string): Observable<UserDto> {
        const url = this.baseUrl + '/disable/'
        return this._http.put<UserDto>(url+uniqueUrl, {})
    }

    enableUser(uniqueUrl: string): Observable<UserDto> {
        const url = this.baseUrl + '/enable/'
        return this._http.put<UserDto>(url+uniqueUrl, {})
    }

    setFavoriteEvent(eventUrl: string): Observable<boolean> {
        const url = this.baseUrl + '/' + AuthenticationService.getAppUser.url + '/setFavorite/'
        return this._http.put<boolean>(url+eventUrl, {})
    }

    setAttendEvent(eventUrl: string): Observable<boolean> {
        const url = this.baseUrl + '/' + AuthenticationService.getAppUser.url + '/setAttend/'
        return this._http.put<boolean>(url+eventUrl, {})
    }

    getByUrl(uniqueUrl: string): Observable<UserDto> {
        const url = this.baseUrl + '/getByUrl/' + uniqueUrl;
        return this._http.get<UserDto>(url);
    }

    save(dto: UserDto): Observable<UserDto> {
        return this._http.post<UserDto>(this.baseUrl, dto);
    }

    get(id: number | string): Observable<UserDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<UserDto>(url);
    }

    filter(criteria: UserCriteria): Observable<Page<UserDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<UserDto>>(url, criteria);
    }

    update(dto: UserDto): Observable<UserDto> {
        const url = this.baseUrl + '/' + dto.url
        return this._http.put<UserDto>(url, dto);
    }
}
