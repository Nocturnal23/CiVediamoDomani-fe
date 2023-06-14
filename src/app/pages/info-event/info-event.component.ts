import { Component } from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";

@Component({
    selector: 'app-info-event',
    templateUrl: './info-event.component.html',
    styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent {

    eventDto: EventDto;

    constructor() {
      this.eventDto = {
        url: "",
        id: 0,
        title : "Titolo evento",
        place : "Luogo evento",
        dateTime : new Date(2000,1,1),
        description : "Descrizione evento",
        price : 0,
        categories : [{name: "sport", id: 0, url: ""}, {name: "calcio", id: 1, url: ""}]
      }
    }

    isFree() {
        return true;
    }
}
