import {Component, Input, OnInit} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {UserService} from "../../core/services/user.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";

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
    photo: string;
    titleMaxLen = 80;
    descrMaxLen = 150;

    constructor(private _userService: UserService,
                private _router: Router) {
    }

    ngOnInit() {
        this.eventDate = this.eventDto?.datetime?.toDateString()
        this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
        this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
        this.ticketing = !this.eventDto?.price ? 'Evento aperto a tutti' : `Costo biglietto: ${this.eventDto.price} €`;
        this.photo = 'https://cinematroisi.it/wp-content/uploads/2021/09/%C2%A9Flavia-Rossi_Cinema-Troisi_013-Copia-1024x831.jpg';
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
        return true; //TODO: Da modificare
    }

    goToInfo() {
        this._router.navigate(['infoevent/'+this.eventDto.url])
    }
}
