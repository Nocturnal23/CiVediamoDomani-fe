import {Injectable} from "@angular/core";
import {UserDto} from "../dto/user-dto";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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
            // let guagliuna = "guagliuna";
            // let anni = 20;
            // morta(guagliuna, 'luzzi', anni);
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
        return this._http.post<UserDto>(url, user, {observe: 'response'}).pipe(tap(resp => {
            let authToken  = resp.headers.get('Authorization');
            if (authToken != null) {
                localStorage.setItem('token', JSON.stringify(authToken));
                AuthenticationService._token = authToken;
            }

            let loggedUser = resp.body;
            if (loggedUser != null) {
                localStorage.setItem('user', JSON.stringify(loggedUser));
                AuthenticationService._appuser = loggedUser;
            }

            console.log('CIAO ' + AuthenticationService.getAuthToken) //TODO Da togliere
            console.log(AuthenticationService.getAppUser) //TODO Da togliere
            console.log('Auth service') //TODO Da togliere
        }));
    }
}
