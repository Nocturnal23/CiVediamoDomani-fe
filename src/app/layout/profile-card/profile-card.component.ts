import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {Enums} from "../../core/utils/Enums";

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
        this._router.navigate(['/user/profile', AuthenticationService.getAppUser.url] );
    }

    hasDashboard() {
        return AuthenticationService.getAppUser.appRole === Enums.ADMIN_ROLE;
    }

    goToDashboard() {
        this._router.navigate(['/dashboard'] );
    }

    goToSettings() {
        this._router.navigate(['/user/settings'] );
    }

    doLogout() {
        this._authService.logOut();
    }
}
