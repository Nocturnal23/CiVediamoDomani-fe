import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Enums} from "../../core/utils/Enums";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
    constructor(private router: Router) {
    }

    goToProfile() {
        this.router.navigate([Enums.USER_PROFILE, AuthenticationService.getAppUser.url] );
    }
}
