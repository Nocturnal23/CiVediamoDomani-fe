import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

    constructor(private _authService : AuthenticationService,
                private _router : Router) {
    }
    logout() {
        this._authService.logOut();
    }

    profile() {
        this._router.navigate(['/profile'] );
    }

    settings() {
        this._router.navigate(['/settings'] );
    }
}
