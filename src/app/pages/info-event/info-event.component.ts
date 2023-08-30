import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {faFacebook, faStaylinked, faTwitter} from "@fortawesome/free-brands-svg-icons";
import mapboxgl from 'mapbox-gl';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddCategoryComponent} from "../../layout/dialog-add-category/dialog-add-category.component"; // or "const mapboxgl = require('mapbox-gl');"

@Component({
    selector: 'app-info-event',
    templateUrl: './info-event.component.html',
    styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements AfterViewInit {
    eventDto: EventDto;
    url: string
    eventDate: string;
    attending: boolean;
    favorite: boolean;
    fbIcon = faFacebook
    twIcon = faTwitter
    copyIcon = faStaylinked
    longitude: number
    latitude: number
    map = document.getElementById("map")
    photo: SafeUrl

    constructor(private eventService: EventService,
                private router: Router,
                private activatdRoute: ActivatedRoute,
                private changeDetectorRef: ChangeDetectorRef,
                private _sanitizer: DomSanitizer,
                private dialog: MatDialog) {

        this.eventDto = this.router.getCurrentNavigation()?.extras?.state?.['event']

    }

    ngAfterViewInit(): void {
        if (this.eventDto) {
            this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
            this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
            this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
            this.isFree()
            this.getCoordinates()
            this.loadMap()
            this.loadImg()
        } else {
            this.activatdRoute.params.subscribe(({url}) => {
                this.url = url;
                this.eventService.getByUrl(this.url).subscribe((event) => {
                    this.eventDto = event;
                    this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
                    this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
                    this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
                    this.isFree()
                    this.getCoordinates()
                    this.loadMap()
                    this.loadImg()
                });
            });
        }
    }

    isFree() {
        return this.eventDto?.price == 0;
    }

    onGoing() {
        return new Date(this.eventDto?.datetime) > new Date();
    }

    private loadMap() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViY3ZkIiwiYSI6ImNsa2ZwYm56MDA4ZzIzc3NleTMwdnhsMWIifQ.sU_r9FMc4zD1FAlNTvzppw';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/webcvd/clkfq9gb7005901qp8lz0c361',
            center: [this.longitude, this.latitude],
            zoom: 15,
            scrollZoom: {
                speed: 1,
                around: 'center'
            }
        });
        map.addControl(new mapboxgl.NavigationControl());

        const marker = new mapboxgl.Marker()
            .setLngLat([this.longitude, this.latitude])
            .addTo(map);

        this.changeDetectorRef.detectChanges();
    }
    private getCoordinates() {
        console.log( this.eventDto.coordinates.split(',') )
        this.longitude = Number( this.eventDto.coordinates.split(',')[0] )
        this.latitude = Number( this.eventDto.coordinates.split(',')[1] )
    }

    private loadImg() {
        if (!!this.eventDto.image) {
            this.photo = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.eventDto.image)
        } else {
            this.photo = 'assets/Comic_image_missing.svg.png';
        }
    }

    openImage() {
        let dialogContent = this.dialog.open(DialogAddCategoryComponent,
            { data: {
                    image: this.photo,
                    inputType: 'img'}
            })

        dialogContent.afterClosed().subscribe(() => {});
    }
}
