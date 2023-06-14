import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../core/dto/user-dto";

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
    user: UserDto
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.user = this.router.getCurrentNavigation().extras.state['user']
        if (!this.user) {
            this.activatedRoute.params.subscribe(({url}) => { this.user });
        }
    }
}
