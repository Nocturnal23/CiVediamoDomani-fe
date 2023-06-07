import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";
import {UserDto} from "../../core/dto/user-dto";

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
            // categories: [''],
            description: ['']
        })
    }

    createEvent(){
      const event : EventDto = {
        ...this.editEvent.value,
        coordinates: "10.00000 10.000000"
      }

      this._eventService.save(event).subscribe(

      )
    }
}
