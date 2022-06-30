import {AbstractService} from "./abstract.service";
import {UserCriteria} from "../criteria/user-criteria";
import {UserDto} from "../dto/user-dto";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {HttpClient} from "@angular/common/http";

export class UserService implements AbstractService<UserDto, UserCriteria> {
    private baseUrl: string;

    constructor(
        private http: HttpClient) {
        this.baseUrl = '/users';
    }
    
    // delete(id: number | string): Observable<UserDto> {
    // }

    get(id: number | string): Observable<UserDto> {
        const url = this.baseUrl + '/' + id;
        return this.http.get<UserDto>(url);
    }

    filter(criteria: UserCriteria): Observable<Page<UserDto>> {
        const url = this.baseUrl + '/filter';
        return this.http.post<Page<UserDto>>(url, criteria);
    }

    // save(dto: UserDto): Observable<UserDto> {
    //     return undefined;
    // }
    //
    // update(dto: UserDto): Observable<UserDto> {
    //     return undefined;
    // }
}
