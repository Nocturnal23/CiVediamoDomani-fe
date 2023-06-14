import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {RoleEnums, RoutingEnums} from "../../core/utils/Enums";

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

    constructor(private _authService : AuthenticationService,
                private _router : Router) {
    }

    goToProfile() {
        this._router.navigate([RoutingEnums.USER_PROFILE, AuthenticationService.getAppUser.url] );
    }

    hasDashboard() {
        return AuthenticationService.getAppUser.appRole === RoleEnums.ADMIN_ROLE;
    }

    goToDashboard() {
        this._router.navigate([`/${RoutingEnums.DASHBOARD}`] );
    }

    goToSettings() {
        this._router.navigate([RoutingEnums.USER_SETTINGS] );
    }

    doLogout() {
        this._authService.logOut();
    }
}
