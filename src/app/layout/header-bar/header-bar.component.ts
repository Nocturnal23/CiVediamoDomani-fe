import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {

    searchForm : FormGroup;

    constructor(private _router: Router,
                private _formBuilder: FormBuilder) {
        this.searchForm = _formBuilder.group({
            searchBar: ['']
        })
    }

    search() {
        console.log(this.searchForm.value.searchBar)
        // console.log(this._searchBar)
        // this._router.navigateByUrl("/helloworld")
        // this._route.navigate(['/addCollaborator', this._selectedDelegated.id]);
    }
}
