import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {EventDto} from "../../core/dto/event-dto";

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
    public searchLocation: string = '';
    public searchRange: number = 0;
    public sliderMinRange: number = 10;
    public sliderMaxRange: number = 100;
    public sliderStep: number = 10;
    public values: any = '';
    eventList: EventDto[] = [];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private eventService: EventService) {
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(
            ({eventList}) => {
                this.eventList = eventList.content
            });
        this.activatedRoute.params.subscribe(({query}) => {
            this.values = query
        })
        this.searchLocation = 'Milano';
    }
}
