import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {

    searchForm : FormGroup;

    constructor(private _router: Router,
                private _formBuilder: FormBuilder,
                private _authService : AuthenticationService) {
        this.searchForm = _formBuilder.group({
            searchBar: ['']
        })
    }
    search() {
      console.log("Da header-bar: " + this.searchForm.value.searchBar)
      this._router.navigate(['/search', this.searchForm.value.searchBar] )
    }

    isLogged() {
        return this._authService.isLogged();
    }

    goToLogin() {
        this._router.navigate(['/login'])
    }
}
