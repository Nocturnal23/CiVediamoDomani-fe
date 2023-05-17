import {Injectable} from "@angular/core";
import {UserDto} from "../dto/user-dto";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SocialUser} from "@abacritt/angularx-social-login";

@Injectable({providedIn: "root"})
export class AuthenticationService {
    private baseUrl : string
    private static _token: string
    private static _appuser: UserDto

    constructor( private _http: HttpClient) {
        this.baseUrl = environment.BE_URL + "/v1"
    }
    static get getAuthToken(): string {
        if (this._token == null) {
            const local = localStorage.getItem('token');
            if (local != null) {
                this._token = JSON.parse(local)
            }
        }

        return this._token;
    }

    static get getAppUser(): UserDto {
        if (this._appuser == null) {
            const local = localStorage.getItem('user');
            if (local != null) {
                this._appuser = JSON.parse(local)
            }
        }
        return this._appuser;
    }

    signUp(user : UserDto) : Observable<UserDto> {
        const url = this.baseUrl + "/signUp"
        return this._http.post<UserDto>(url, user).pipe()
    }

    signIn(user : UserDto) {
        const url = this.baseUrl + "/signIn"
        return this._http.post<UserDto>(url, user, {observe: 'response'}).pipe(
            tap(resp => this._setLoggedUser(resp))
        );
    }

    googleSignIn(user : SocialUser) {
        const url = this.baseUrl + "/signIn"
        return this._http.post<UserDto>(url, user, {observe: 'response'}).pipe(
            tap(resp => this._setLoggedUser(resp))
        );
    }

    private _setLoggedUser(response : HttpResponse<UserDto>) {
        let authToken  = response.headers.get('Authorization');
        if (authToken != null) {
            localStorage.setItem('token', JSON.stringify(authToken));
            AuthenticationService._token = authToken;
        }

        let loggedUser = response.body;
        if (loggedUser != null) {
            localStorage.setItem('user', JSON.stringify(loggedUser));
            AuthenticationService._appuser = loggedUser;
        }
    }
}
