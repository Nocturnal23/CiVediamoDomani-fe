import {Component, OnInit} from '@angular/core';
import {debounceTime, map, Observable} from "rxjs";
import {EventDto} from "../../core/dto/event-dto";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {EventCriteria} from "../../core/criteria/event-criteria";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-dashboard-event',
    templateUrl: './dashboard-event.component.html',
    styleUrls: ['./dashboard-event.component.css']
})

export class DashboardEventComponent implements OnInit {

    totalElement: number
    eventPageSize: number
    eventData: Observable<Array<EventDto>>
    displayedColumns: Column[] = [
        { name: 'Titolo', id: 'title', sort: 'title', path: 'title',  visible: true, isModelProperty: true },
        { name: 'Descrizione', id: 'description', sort: 'description', path: 'description',  visible: true, isModelProperty: true },
        { name: 'Organizzatore', id: 'organiser.firstName', sort: 'organiser.firstName' , path: 'organiser.firstName', visible: true, isModelProperty: true },
        { name: 'Partecipanti', id: 'attendes', sort: 'attendes' , path: 'attendes', visible: true, isModelProperty: true },
    ]
    search: FormGroup;

    criteria: EventCriteria = {};

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventService: EventService,
                private formBuilder: FormBuilder) {

        this.search = formBuilder.group({
            searchValue: ['']
        })
    }

    ngOnInit() {
        this.search.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
            this.criteria = {
                ...this.criteria, ...this.search.value
            }
            this.loadEvent()
        })

        this.eventData = this.activatedRoute.data.pipe(
            map( res => {
                this.totalElement = res['eventDashList'].totalElements
                this.eventPageSize = res['eventDashList'].pageSize
                return res['eventDashList'].content
            })
        );
    }

    doLazyLoad( event: LazyLoadEvent ) {
        this.criteria = {...this.criteria, pageSize: event.pageSize, pageNumber: event.pageIndex}
        this.loadEvent()
    }

    loadEvent() {
        this.eventData = this.eventService.filter(this.criteria).pipe(
            map(res => res.content)
        )
    }

    infoEvent($event: any) {
        console.log($event.data.url)
        this.router.navigate(['/dashboard/eventinfo', $event.data.url], {state: { event: $event.data }})
    }
}