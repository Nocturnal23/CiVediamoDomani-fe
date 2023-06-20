import { Component } from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

    eventDto : EventDto;
    attending: boolean;
    favorite: boolean;
    ticketing: string;
    photo: string;

    constructor() {
        this.eventDto = {
            id: 10,
            title: 'Le banane di Fazio - Assaggi e Massaggi',
            description: 'Francesco Fazio propone un giro di assaggi della sua banana. Gradita la presenza habitué aula studio.',
            datetime: new Date('20/05/2023'),
            url: 'testing'
        }
        this.attending = false;
        this.favorite = false;
        this.ticketing = 'Evento aperto a tutti';
        this.photo = 'https://cinematroisi.it/wp-content/uploads/2021/09/%C2%A9Flavia-Rossi_Cinema-Troisi_013-Copia-1024x831.jpg';
    }

    setAttending(value: boolean) {
        this.attending = value;
    }

    setFavorite(value: boolean) {
        this.favorite = value;
    }

}
