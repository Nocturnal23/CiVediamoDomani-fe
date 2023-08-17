import {inject, Injectable} from '@angular/core'
import {AuthenticationService} from './authentication.service'
import {UserService} from './user.service'

@Injectable({providedIn: "root"})
export class SearchService {
    private _defaultLocation: string = "Roma";
    private _defaultLatitude: string = "12.492650148954052";
    private _defaultLongitude: string = "41.890353287010065";


    constructor(private _userService: UserService,
                private _authenticationService: AuthenticationService) {
    }

    setNewLocation(place: string, latitude: string, longitude: string) {
        this._defaultLocation = place
        this._defaultLatitude = latitude
        this._defaultLongitude = longitude

        if( AuthenticationService.isLogged() ) {
            this._saveLocation()
        }
    }

    private _saveLocation() {
        this._userService.save({
            ...AuthenticationService.getAppUser,
            searchLocation: this._defaultLocation,
            searchLongitude: this._defaultLongitude,
            searchLatitude: this._defaultLatitude,
        }).subscribe( () => this._authenticationService.refreshLoggedUser() );
    }

    get searchLocation(): string {
        if (AuthenticationService.isLogged()) {
            if (!!AuthenticationService.getAppUser.searchLocation)
                return AuthenticationService.getAppUser.searchLocation
            this._saveLocation()
        }
        return this._defaultLocation;
    }

    get searchLatitude(): string {
        if (AuthenticationService.isLogged()) {
            if (!!AuthenticationService.getAppUser.searchLatitude)
                return AuthenticationService.getAppUser.searchLatitude
            this._saveLocation()
        }

        return this._defaultLatitude;
    }

    get searchLongitude(): string {
        if (AuthenticationService.isLogged()) {
            if (!!AuthenticationService.getAppUser.searchLongitude)
                return AuthenticationService.getAppUser.searchLongitude
            this._saveLocation()
        }
        return this._defaultLongitude;
    }
}
