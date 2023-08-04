import {Injectable} from "@angular/core";
import {UserDto} from "../dto/user-dto";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {RoutingEnums} from "../utils/Enums";

@Injectable({providedIn: "root"})
export class AuthenticationService {
    private baseUrl : string
    private static _token: string
    private static _appuser: UserDto | null

    constructor( private _http: HttpClient,
                 private _socialauthService: SocialAuthService,
                 private _router: Router) {
        this.baseUrl = environment.BE_URL + "/v1"
        this._socialauthService.authState.subscribe((user) => {
            if (user !== null) {
                this.googleSignIn(user).subscribe( next => {
                    this._router.navigate([`/${RoutingEnums.HOMEPAGE}`] )
                })
            } else {
                this.logOut();
            }

        });
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

    static get getAppUser(): UserDto | null{
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

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        AuthenticationService._token = "";
        AuthenticationService._appuser = null;
        this._router.navigate([`/${RoutingEnums.HOMEPAGE}`] )
    }

    googleSignIn(user : SocialUser) {
        const url = this.baseUrl + "/googleSignIn"
        return this._http.post<UserDto>(url, user, {observe: 'response'}).pipe(
            tap(resp => this._setLoggedUser(resp))
        );
    }

    private _setLoggedUser(response : HttpResponse<UserDto>) {
        let authToken = response?.headers.get('Authorization');
        let loggedUser = response?.body;
        if (authToken != null && loggedUser != null) {
            localStorage.setItem('token', JSON.stringify(authToken));
            AuthenticationService._token = authToken;
            localStorage.setItem('user', JSON.stringify(loggedUser));
            AuthenticationService._appuser = loggedUser;
        }
    }

    static isLogged() {
        return !!AuthenticationService.getAuthToken && !!AuthenticationService.getAppUser;
    }

    resetPassword(email: string) {
        const url = this.baseUrl + "/resetPassword"
        return this._http.post<UserDto>(url, email);
    }
}
