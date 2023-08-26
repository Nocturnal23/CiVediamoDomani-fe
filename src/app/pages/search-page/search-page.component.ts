import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {EventService} from '../../core/services/event.service'
import {EventDto} from '../../core/dto/event-dto'
import {CategoryService} from '../../core/services/category.service'
import {firstValueFrom} from 'rxjs'
import {CategoryDto} from '../../core/dto/category-dto'
import {SearchService} from "../../core/services/search.service";
import {SearchParamsDto} from "../../core/dto/searchParams-dto";

export interface CategoryElement {
    name: string,
    father?: string,
    children?: CategoryElement[]
}

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
    return earthRadiusKm * c;
}

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
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
    catList: CategoryElement[] = []

    constructor(private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _eventService: EventService,
                private _categoryService: CategoryService,
                private _searchService: SearchService) {


    }

    ngOnInit() {
        this.loadData()
        this.loadTree()
    }

    async loadData() {
        const paramsPromise = firstValueFrom(this._activatedRoute.queryParamMap)
        const dataPromise = firstValueFrom(this._activatedRoute.data)
        const [params, data] = await Promise.all([paramsPromise,dataPromise])

        this.searchValue = params.get("searchValue")
        this.searchLocation = params.get("place")
        this.searchLongitude = params.get("lon")
        this.searchLatitude = params.get("lat")
        let categories = params.getAll("categories")
        if (!!categories) {
            this.selectedCategories = categories
        }
        this.loadedEvents = data['eventList'].content
        this._loadEventList()
    }

    private loadTree() {
        this._categoryService.filter({pageSize:100}).subscribe(res => {
            //Inserisce le categorie padre nella lista di CategoryElement
            let fathers = res.content.filter(cat => !cat.father)
            if (!!fathers) {
                this.catList.push(...fathers.map(elem => this.categoryToElement(elem)))
                //Inserisce le categorie figlie nella lista
                let children = res.content.filter(cat => !!cat.father).map(elem => this.categoryToElement(elem))
                //trovare il father nell'array e pusharlo come children
                children.forEach(child => {
                    this.catList.map(parent => {
                        if (parent.name === child.father) {
                            parent.children.push(child)
                        }
                        return parent
                    })})
            }
        })
    }

    categoryToElement(origin: CategoryDto): CategoryElement {
        return {name: origin.name, father: origin.father?.name, children: []};
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

    toogleElement(elem: CategoryElement | string) {
        let catname
        if( typeof elem === "string" )
            catname = elem
        else
            catname = elem.name

        let index = this.selectedCategories.indexOf( catname )

        if( !!index && index == -1 ) {
            this.selectedCategories.push(catname)
        } else {
            this.selectedCategories.splice(index, 1)
        }

        let params: SearchParamsDto = {
            categories: this.selectedCategories,
            place: this._searchService.searchLocation,
            lat: this._searchService.searchLatitude,
            lon: this._searchService.searchLongitude
        }
        this._router.navigate(["/loading"], {skipLocationChange: true}).then( () =>
            this._router.navigate( ["/search"], {queryParams: params})
        )
    }
}
