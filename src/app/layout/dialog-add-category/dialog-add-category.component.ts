import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {SafeUrl} from "@angular/platform-browser";

enum InputType {
    Text = 'text',
    Map = 'map',
    Img = 'img'
}
@Component({
    selector: 'app-dialog-add-category',
    templateUrl: './dialog-add-category.component.html',
    styleUrls: ['./dialog-add-category.component.css']
})

export class DialogAddCategoryComponent implements AfterViewInit{
    newCategory: FormGroup
    newName: string
    latitude: number
    longitude: number
    place_name: string
    selectedPosition
    protected readonly InputType = InputType;


    constructor(private formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: { dialogTitle: string, placeholderText: string, image: SafeUrl, inputType: InputType }) {
        this.newCategory = formBuilder.group({
            name: ['']
        })
    }

    createCat() {
        this.newName = this.newCategory.value.name
    }

    ngAfterViewInit() {
        if (this.data.inputType === InputType.Map) {
            mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViY3ZkIiwiYSI6ImNsa2ZwYm56MDA4ZzIzc3NleTMwdnhsMWIifQ.sU_r9FMc4zD1FAlNTvzppw';
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                types: 'country,region,place'
            });

            geocoder.addTo('#geocoder');

            const results = document.getElementById('result');

            geocoder.on('result', (e) => {
                const coordinates = e.result.center;
                this.longitude = coordinates[0];
                this.latitude = coordinates[1];
                this.place_name = e.result.text.split(',')[0].trim();

                this.selectedPosition = {lon: this.longitude, lat: this.latitude, place: this.place_name}
            });

            geocoder.on('clear', () => {
                results.innerText = '';
            });
        }
    }

    protected readonly MatDialogRef = MatDialogRef;
}
