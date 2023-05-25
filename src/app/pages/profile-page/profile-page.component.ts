import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
    name: string | undefined
    surname: string | undefined
    email: string | undefined
    password: string | undefined

    constructor() {
        this.name = AuthenticationService.getAppUser?.firstName;
        this.surname = AuthenticationService.getAppUser?.lastName;
        this.email = AuthenticationService.getAppUser?.email;
        this.password = AuthenticationService.getAppUser?.password;
    }
}
