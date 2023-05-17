import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {UserDto} from "../../core/dto/user-dto";
import {SocialAuthService} from "@abacritt/angularx-social-login";

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
                private _router: Router) {
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
        this._socialauthService.authState.subscribe((user) => {
            if (user !== null) {
              this.loginToBackend(user.email, user.firstName, user.lastName, user.idToken).subscribe((loggedIn) => {
                this._loginState.next(loggedIn);
              });
            } else {
              this._loginState.next(false);
            }

            console.log('ciao auth google')
            console.log(user)
            // this.user = user;
            // this.loggedIn = (user != null);
        });
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
            console.log("Sto cambiando pagina")
            console.log(AuthenticationService.getAuthToken)
            console.log(AuthenticationService.getAppUser)
            this._router.navigate(['/homepage'] )
        })
    }
}
