import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {UserService} from "../../core/services/user.service";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent {
    restorePassword: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private authenticationService: AuthenticationService) {

        this.restorePassword = formBuilder.group({
            password: ['']
        })
    }

    restore() {

    }

    deleteProfile() {
        this.userService.delete(AuthenticationService.getAppUser.id).subscribe( () => {
            this.authenticationService.logOut()
        })
    }
}
