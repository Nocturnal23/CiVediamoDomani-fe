import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoutingEnums} from "../../core/utils/Enums";
import {SearchService} from "../../core/services/search.service";
import {SearchParamsDto} from '../../core/dto/searchParams-dto'

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {

    searchForm : FormGroup;

    searchLocation: string;

    constructor(private _router: Router,
                private _formBuilder: FormBuilder,
                private _authService : AuthenticationService,
                private _searchService: SearchService) {
        this.searchForm = _formBuilder.group({
            searchBar: ['']
        })

        this.searchLocation = _searchService.searchLocation
    }
    search() {
        let params: SearchParamsDto = {
            searchValue: this.searchForm.value.searchBar,
            place: this.searchLocation,
            lon: this._searchService.searchLongitude,
            lat: this._searchService.searchLatitude
        }
        this._router.navigate(['/search'], {queryParams: params})
    }

    isLogged() {
        return this._authService.isLogged();
    }

    goToLogin() {
        this._router.navigate([`/${RoutingEnums.LOGIN}`])
    }

    goToEvent() {
        this._router.navigate([RoutingEnums.USER_EVENTS] );
    }

    changeLocation() {
        //apri popup per la ricerca tramite mapbox (come quella sulla creazione evento
        //chiuso popup salvi la nuova location
        this.searchLocation = 'Nuova location'
        if (this._authService.isLogged()) {
            //salva la location nel db per l'utente loggato
        }

    }
}
