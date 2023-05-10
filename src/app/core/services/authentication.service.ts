import {Injectable} from "@angular/core";
import {UserDto} from "../dto/user-dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class AuthenticationService {
  private baseUrl : string
  constructor( private _http: HttpClient) {
    this.baseUrl = environment.BE_URL + "/v1"
  }

  signUp(user : UserDto) : Observable<UserDto> {
    const url = this.baseUrl + "/signUp"
    return this._http.post<UserDto>(url, user)
  }

  signIn(user : UserDto) {
    const url = this.baseUrl + "/signIn"
    return this._http.post<any>(url, user, {observe: 'response'}).subscribe(resp => {
      console.log(resp);
      console.log(resp.headers.get('Authorization'));
    })
    //TODO: Deve restituire un Token.
  }
}
