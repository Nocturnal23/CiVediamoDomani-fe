import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {UserDto} from "../../core/dto/user-dto";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {RoutingEnums} from "../../core/utils/Enums";
import {DialogAddCategoryComponent} from "../../layout/dialog-add-category/dialog-add-category.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-loginpage',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


    container: any;
    signUpForm: FormGroup;
    signInForm: FormGroup;
    login: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthenticationService,
                private _socialauthService: SocialAuthService,
                private _router: Router,
                private dialog: MatDialog) {
        this.signUpForm = _formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: [''],
            password: ['']
        })

        this.signInForm = _formBuilder.group({
            email: [''],
            password: ['']
        })

        this.login = true
    }

    ngOnInit() {
        this.container = document.getElementById('container');
    }

    switchForm() {
        if (this.login) {
            this.container.classList.add("right-panel-active");
            this.login = false;
        }
        else {
            this.container.classList.remove("right-panel-active");
            this.login = true;
        }
    }

    signUp() {
        const user : UserDto = {
            ...this.signUpForm.value
        }
        this._authService.signUp(user).subscribe()
    }

    signIn() {
        const user : UserDto = {
            ...this.signInForm.value
        }
        this._authService.signIn(user).subscribe( next => {
            this._router.navigate([`/${RoutingEnums.HOMEPAGE}`] )
        })
    }

    restore(title:string) {
        let dialogContent = this.dialog.open(DialogAddCategoryComponent,
            { data: { dialogTitle: title }
            })
        dialogContent.afterClosed().subscribe(res => {
            if( dialogContent.componentInstance.newName != null && dialogContent.componentInstance.newName != "" ) {
                console.log(dialogContent.componentInstance.newName)
                this._authService.resetPassword(dialogContent.componentInstance.newName).subscribe()
            }
        })
    }
}
