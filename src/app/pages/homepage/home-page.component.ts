import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";
import {CategoryService} from "../../core/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";
import {CategoryDto} from "../../core/dto/category-dto";
import {EventService} from "../../core/services/event.service";
import {SearchService} from "../../core/services/search.service";
import {SearchParamsDto} from '../../core/dto/searchParams-dto'
import {buildDate} from '../../core/utils/Functions'

@Component({
    selector: 'app-homepage',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    categories: Observable<Array<CategoryDto>>
    categorieCarosello: CategoryDto[] = [];


    constructor(private _authService : AuthenticationService,
                private _categoryService: CategoryService,
                private _eventService: EventService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _searchService: SearchService) {

        this.categories = this._categoryService.filter({}).pipe(
            map((macroCategories) => macroCategories.content)
        );

        this.categories.subscribe((categoryArray: CategoryDto[]) => {
            categoryArray.forEach((category: CategoryDto) => {
                if( category.father == null ) {
                    this.categorieCarosello.push(category)
                }
            });
        });
    }

    showCreateButton() : boolean {
        return AuthenticationService.isLogged();
    }

    changeCategory(move: number) {
        let categoria
        if( move == 1 ) {
            categoria = this.categorieCarosello.shift()
            this.categorieCarosello.push(categoria)
        }

        if( move == -1 ) {
            categoria = this.categorieCarosello.pop()
            this.categorieCarosello.unshift(categoria)
        }
    }

    loadEvents(category: CategoryDto) {
        let params: SearchParamsDto = {
            categories: [category.name],
            place: this._searchService.searchLocation,
            lat: this._searchService.searchLatitude,
            lon: this._searchService.searchLongitude,
            eventDate: [buildDate(new Date())]
        }
        this._router.navigate( ["/search"], {queryParams: params})
    }
}
