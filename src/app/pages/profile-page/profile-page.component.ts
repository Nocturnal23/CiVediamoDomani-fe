import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../core/dto/user-dto";
import {UserService} from "../../core/services/user.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoleEnums} from "../../core/utils/Enums";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
    user: UserDto = AuthenticationService.getAppUser
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private userService: UserService) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user']

        if (!this.user) {
            this.activatedRoute.params.subscribe(({url}) => {
                if ( url === AuthenticationService.getAppUser?.url ) {
                    this.user = AuthenticationService.getAppUser
                }
                else {
                    this.userService.getByUrl(url).subscribe(user => this.user = user)
                }
            });
        }
    }

    canDeleteUser() {
        return AuthenticationService.getAppUser.appRole === RoleEnums.ADMIN_ROLE && this.user.id != AuthenticationService.getAppUser.id
    }

    deleteUser() {
        this.userService.disableUser(this.user.url).subscribe() //TODO DA modificare con disable
    }
}
