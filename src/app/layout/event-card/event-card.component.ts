import {Component, Input} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {UserService} from "../../core/services/user.service";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

    @Input() eventDto : EventDto;
    attending: boolean;
    favorite: boolean;
    ticketing: string;
    eventDate: string;
    photo: string;
    titleMaxLen = 80;
    descrMaxLen = 150;

    constructor(private _userService: UserService) {
        // this.eventDto = {
        //     id: 10,
        //     title: 'Le banane di Fazio - Assaggi e Massaggi LOREMLOREMLOREMLOREM LOREMLOREMLOREMLOREMLOREM LOREMLOREM LOREMLOREM LOREMLOREM LOREMLOREM',
        //     description: 'Francesco Fazio propone un giro di assaggi della sua banana. Gradita la presenza habitué aula studio. Da ritenersi invitati anche tutti gli associati P2 e FiloRosso.',
        //     datetime: new Date(),
        //     url: 'testing',
        //     price: 0
        // }
        console.log(this.eventDto)
        this.eventDate = this.eventDto?.datetime?.toDateString()
        this.attending = false; //TODO GET
        this.favorite = false;
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

}
