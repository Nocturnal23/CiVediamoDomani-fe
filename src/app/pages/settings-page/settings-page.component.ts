import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent {
    restorePassword: FormGroup;

    constructor(private formBuilder: FormBuilder,) {

        this.restorePassword = formBuilder.group({
            password: ['']
        })
    }

    restore() {

    }
}
