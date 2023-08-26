import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoutingEnums} from "../../core/utils/Enums";
import {SearchService} from "../../core/services/search.service";
import {SearchParamsDto} from '../../core/dto/searchParams-dto'
import {MatDialog} from "@angular/material/dialog";
import {DialogAddCategoryComponent} from "../dialog-add-category/dialog-add-category.component";

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {

    searchForm : FormGroup;

    searchLocation: string;
    searchLatitude
    searchLongitude

    constructor(private _router: Router,
                private _formBuilder: FormBuilder,
                private _authService : AuthenticationService,
                private _searchService: SearchService,
                private _dialog: MatDialog) {
        this.searchForm = _formBuilder.group({
            searchBar: ['']
        })

        this.searchLocation = _searchService.searchLocation
    }
    search() {
        let params: SearchParamsDto = {
            eventTitle: [this.searchForm.value.searchBar],
            place: this.searchLocation,
            lon: this._searchService.searchLongitude,
            lat: this._searchService.searchLatitude
        }
        this._router.navigate(["/loading"], {skipLocationChange: true}).then( () =>
            this._router.navigate( ["/search"], {queryParams: params})
        )
    }

    isLogged() {
        return AuthenticationService.isLogged();
    }

    goToLogin() {
        this._router.navigate([`/${RoutingEnums.LOGIN}`])
    }

    goToEvent() {
        this._router.navigate([RoutingEnums.USER_EVENTS] );
    }

    changeLocation(title:string, placeholder:string) {
        let dialogContent = this._dialog.open(DialogAddCategoryComponent, {
            data: {
                dialogTitle: title,
                placeholder: placeholder,
                inputType: 'map'
            }
        })

        dialogContent.afterClosed().subscribe(res => {
            this.searchLocation = dialogContent.componentInstance.selectedPosition.place
            this.searchLatitude = dialogContent.componentInstance.selectedPosition.lat
            this.searchLongitude = dialogContent.componentInstance.selectedPosition.lon

            this._searchService.setNewLocation( this.searchLocation, this.searchLatitude, this.searchLongitude )
        })

    }
}
