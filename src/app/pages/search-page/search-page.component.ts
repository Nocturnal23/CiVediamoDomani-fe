import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {EventDto} from "../../core/dto/event-dto";
import {map, Observable} from "rxjs";

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
    // @ts-ignore
    eventList$: Observable<EventDto[]>;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private eventService: EventService) {
    }
    ngOnInit() {
        // @ts-ignore
        this.eventList$ = this.activatedRoute.snapshot.data.eventList;
        console.log(this.eventList$)
        // this.activatedRoute.params.subscribe( routeParams => {this._loadData(routeParams)} )
        this.searchLocation = 'Milano';
    }

    private _loadData( routeParams : any ) {
        this.values = routeParams['query']
        // @ts-ignore
        this.eventList$ = this.eventService.filter({}).pipe(map(res => res.content));

    }
}
