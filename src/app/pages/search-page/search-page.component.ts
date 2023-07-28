import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {EventDto} from "../../core/dto/event-dto";
import {CategoryService} from "../../core/services/category.service";

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
    searchRange: number = 0;
    sliderMinRange: number = 10;
    sliderMaxRange: number = 100;
    sliderStep: number = 10;

    searchValue: string = '';
    searchLocation: string = '';
    eventList: EventDto[] = [];

    constructor(private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _eventService: EventService,
                private _categoryService: CategoryService) {
    }
    ngOnInit() {
        this._activatedRoute.data.subscribe(({eventList}) => { this.eventList = eventList.content });
        this._activatedRoute.queryParamMap.subscribe(params => {this.searchValue = params.get("searchValue")});
        this.searchLocation = 'Milano';
    }

    onSliderChange() {
        // this.service.filter({
        //     ...this.criteria,
        //     searchrange: this.searchRange
        // }).subscribe( data => this.eventList = data.content )

        console.log(this.searchRange)
    }
}
