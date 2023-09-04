import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../core/dto/user-dto";
import {UserService} from "../../core/services/user.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoleEnums, UserStateEnums} from "../../core/utils/Enums";

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
    user: UserDto = AuthenticationService.getAppUser
    buttonLabel: string;
    numberEventCreated: number;
    numberEventPartecipated: number;
    subscriptionDate: string;
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
                    this.userService.getByUrl(url).subscribe(user =>this.user = user)
                }
            });
        }
        this.buttonLabel = this.user?.state === UserStateEnums.ENABLE? "Disabilita utente" :  "Abilita utente"
    }

    canChangeState() {
        return (AuthenticationService.getAppUser.appRole === RoleEnums.ADMIN_ROLE) && (this.user?.url != AuthenticationService.getAppUser.url)
    }

    changeState() {
        if ( this.user.state === UserStateEnums.ENABLE ) {
            this.userService.disableUser(this.user.url).subscribe( user => this.user = user )
            this.buttonLabel = "Abilita utente"
        }
        else {
            this.userService.enableUser(this.user.url).subscribe( user => this.user = user )
            this.buttonLabel = "Disabilita utente"
        }
    }
}
