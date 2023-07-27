import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {CategoryDto} from "../../core/dto/category-dto";
import {CategoryService} from "../../core/services/category.service";
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements AfterViewInit {
    editEvent: FormGroup;
    categories: Array<CategoryDto>;
    latitude: number;
    longitude: number;
    place_name: string;

    constructor(private _formBuilder: FormBuilder,
                private _eventService: EventService,
                private _categoryService: CategoryService) {
        this._categoryService.filter({pageSize: 50}).subscribe( res => this.categories = res.content )

        this.editEvent = _formBuilder.group({
            title: [''],
            datetime: [],
            price: [0],
            categories: [],
            description: ['']
        })
    }

    ngAfterViewInit() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViY3ZkIiwiYSI6ImNsa2ZwYm56MDA4ZzIzc3NleTMwdnhsMWIifQ.sU_r9FMc4zD1FAlNTvzppw';
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            types: 'country,region,place,postcode,locality,neighborhood,address,poi'
        });

        geocoder.addTo('#geocoder');

        const results = document.getElementById('result');

        geocoder.on('result', (e) => {
            const coordinates = e.result.center;
            this.longitude = coordinates[0];
            this.latitude = coordinates[1];
            this.place_name = e.result.text.split(',')[0].trim();
        });

        geocoder.on('clear', () => {
            results.innerText = '';
        });
    }

    private addFather() {
        const childCategories: CategoryDto[] = this.editEvent.value.categories;

        for (let c = 0; c < childCategories.length; c++) {
            const category = childCategories[c];
            if (category.father) {
                const macroCategoryIndex = childCategories.findIndex(c => c.id === category.father.id);
                if (macroCategoryIndex === -1) {
                    childCategories.push(category.father);
                }
            }
        }
        this.editEvent.patchValue({categories: childCategories});
    }

    createEvent() {
        this.addFather()
        const event: EventDto = {
            ...this.editEvent.value,
            place: this.place_name,
            coordinates: this.longitude + ", " + this.latitude,
            organiser: AuthenticationService.getAppUser
        }
        this._eventService.save(event).subscribe()
    }
}
