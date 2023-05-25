import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-homepage',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

    constructor(private _authService : AuthenticationService) {
        console.log('Homepage: ' + AuthenticationService.getAuthToken)
    }

    showCreateButton() : boolean {
        return this._authService.isLogged();
    }
}
