import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
    editEvent: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _eventService: EventService) {
        this.editEvent = _formBuilder.group({
            title: [''],
            dateTime: [''],
            place: [''],
            price: [''],
            categories: [''],
            description: ['']
        })
    }

    createEvent(){

    }
}
