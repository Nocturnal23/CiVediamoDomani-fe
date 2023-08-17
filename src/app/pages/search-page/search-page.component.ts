import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {EventService} from "../../core/services/event.service";
import {EventDto} from "../../core/dto/event-dto";
import {CategoryService} from "../../core/services/category.service";
import {firstValueFrom} from "rxjs";
import {SearchParamsDto} from '../../core/dto/searchParams-dto'

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusKm = 6371; // Raggio medio della Terra in chilometri

    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = earthRadiusKm * c;

    return distance;
}

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
    searchRange: number = 10;
    sliderMinRange: number = 10;
    sliderMaxRange: number = 150;
    sliderStep: number = 10;

    searchValue: string = '';
    searchLocation: string = '';
    searchLongitude: string;
    searchLatitude: string;
    loadedEvents: EventDto[] = [];
    eventList: EventDto[] = [];
    selectedCategories: string[] = []

    constructor(private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _eventService: EventService,
                private _categoryService: CategoryService) {
        this._router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.ngOnInit();
            }
        });
    }
    ngOnInit() {
        this.loadData()
    }

    async loadData() {
        const paramsPromise = firstValueFrom(this._activatedRoute.queryParamMap)
        const dataPromise = firstValueFrom(this._activatedRoute.data)
        const [params, data] = await Promise.all([paramsPromise,dataPromise])

        this.searchValue = params.get("searchValue")
        this.searchLocation = params.get("place")
        this.searchLongitude = params.get("lon")
        this.searchLatitude = params.get("lat")
        let category = params.get("category")
        if (!!category) {
            this.selectedCategories = [category]
        }

        this.loadedEvents = data['eventList'].content
        this._loadEventList()
    }

    onSliderChange() {
        this._loadEventList()
    }

    private _loadEventList() {
        this.eventList = this.loadedEvents.filter(event => {
            const longitude = Number(event.coordinates.split(',')[0])
            const latitude = Number(event.coordinates.split(',')[1])
            const dist = calculateDistance(Number(this.searchLatitude), Number(this.searchLongitude), latitude, longitude)

            return dist < this.searchRange
        })
    }

    getSearchLabel() {
        if (!!this.searchValue)
            return `Risultati per "${this.searchValue}" su: ${this.searchLocation}`
        if (!!this.selectedCategories[0])
            return `Risultati per ${this.selectedCategories[0]} su: ${this.searchLocation}`
        return `Tutti gli eventi su: ${this.searchLocation}`
    }
}
