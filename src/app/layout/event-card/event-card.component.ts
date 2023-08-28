import {Component, Input, OnInit} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {UserService} from "../../core/services/user.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

    @Input() eventDto : EventDto;
    attending: boolean;
    favorite: boolean;
    ticketing: string;
    eventDate: string;
    photo: SafeUrl;
    titleMaxLen = 80;
    descrMaxLen = 150;

    constructor(private _userService: UserService,
                private _router: Router,
                private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
        if (this.isLogged()) {
            this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
            this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
        }
        this.ticketing = !this.eventDto?.price ? 'Evento aperto a tutti' : `Costo biglietto: ${this.eventDto.price} €`;

        if (!!this.eventDto.image) {
            this.photo = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.eventDto.image)
        } else {
            this.photo = 'assets/Comic_image_missing.svg.png';
        }

    }

    isLogged() {
        return !!AuthenticationService.getAppUser
    }

    setAttending() {
        this._userService.setAttendEvent(this.eventDto.url).subscribe( value => this.attending = value)
    }

    setFavorite() {
        this._userService.setFavoriteEvent(this.eventDto.url).subscribe(value => this.favorite = value)
    }

    getTitle() {
        return this.eventDto.title?.length > this.titleMaxLen ?
            this.eventDto.title?.slice(0, this.titleMaxLen-3) + '...' :
            this.eventDto.title;
    }

    getDescription() {
        return this.eventDto.description?.length > this.descrMaxLen ?
            this.eventDto.description?.slice(0, this.descrMaxLen-3) + '...' :
            this.eventDto.description;
    }

    isOngoin() {
        return new Date(this.eventDto?.datetime) > new Date();
    }

    goToInfo() {
        this._router.navigate(['infoevent/'+this.eventDto.url])
    }
}
