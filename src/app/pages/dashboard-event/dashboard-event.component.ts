import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {EventDto} from "../../core/dto/event-dto";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {EventCriteria} from "../../core/criteria/event-criteria";

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

    constructor(private activatedRoute: ActivatedRoute,
                private eventService: EventService) {
    }

    ngOnInit() {
        this.eventData = this.activatedRoute.data.pipe(
            map( res => {
                this.totalElement = res['eventDashList'].totalElements
                this.eventPageSize = res['eventDashList'].pageSize
                return res['eventDashList'].content
            })
        );

        // this.userInter = this.userService.filter({}).pipe(
        //   map( res => { return res.content } )
        // )
    }

    doLazyLoad( event: LazyLoadEvent ) {
        const criteria: EventCriteria = {pageSize: event.pageSize, pageNumber: event.pageIndex}
        this.eventData = this.eventService.filter(criteria).pipe(
            map( res => { return res.content } )
        )
    }
}

