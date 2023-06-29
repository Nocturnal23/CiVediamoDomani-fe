import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {CategoryDto} from "../../core/dto/category-dto";
import {CategoryService} from "../../core/services/category.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
    editEvent: FormGroup;
    categories: Array<CategoryDto>;

    constructor(private _formBuilder: FormBuilder,
                private _eventService: EventService,
                private _categoryService: CategoryService) {
        this._categoryService.filter({pageSize: 50}).subscribe( res => this.categories = res.content )

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
        const event : EventDto = {
            ...this.editEvent.value,
            coordinates: "10.00000 10.000000",
            organiser: AuthenticationService.getAppUser.id
        }

        this._eventService.save(event).subscribe()
    }
}
