import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RoutingEnums} from "../../core/utils/Enums";
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
        this.router.navigate([RoutingEnums.USER_PROFILE, AuthenticationService.getAppUser.url] );
    }

    goToEvent() {
        this.router.navigate([RoutingEnums.USER_EVENTS] );
    }

    goToSetting() {
        this.router.navigate([RoutingEnums.USER_SETTINGS] );
    }
}
