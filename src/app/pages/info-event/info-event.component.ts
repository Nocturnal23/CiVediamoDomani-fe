import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {faFacebook, faStaylinked, faTwitter} from "@fortawesome/free-brands-svg-icons";
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

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

    map = document.getElementById("map")

    constructor(private eventService: EventService,
                private router: Router,
                private activatdRoute: ActivatedRoute,
                private changeDetectorRef: ChangeDetectorRef) {

        this.eventDto = this.router.getCurrentNavigation()?.extras?.state?.['event']
        if (this.eventDto) {
            this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
            this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
            this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
            this.isFree()
        } else {
            this.activatdRoute.params.subscribe(({url}) => {
                this.url = url;
                this.eventService.getByUrl(this.url).subscribe((event) => {
                    this.eventDto = event;
                    this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
                    this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
                    this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
                    this.isFree()
                });
            });
        }
    }

    ngAfterViewInit(): void {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViY3ZkIiwiYSI6ImNsa2ZwYm56MDA4ZzIzc3NleTMwdnhsMWIifQ.sU_r9FMc4zD1FAlNTvzppw';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/webcvd/clkfq9gb7005901qp8lz0c361',
            center: [16.302584588767076, 38.962913531997714],
            zoom: 8,
            scrollZoom: {
                speed: 1,
                around: 'center'
            }
        });
        map.addControl(new mapboxgl.NavigationControl());

        this.changeDetectorRef.detectChanges();
    }

    isFree() {
        return this.eventDto?.price == 0;
    }

    onGoing() {
        return new Date(this.eventDto?.datetime) > new Date();
    }
}
