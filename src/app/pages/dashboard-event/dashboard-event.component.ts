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
    eventData: Observable<Array<EventDto>>
    displayedColumns: Column[] = [
        { name: 'Titolo', id: 'title', sort: 'title', path: 'title',  visible: true, isModelProperty: true },
        { name: 'Descrizione', id: 'description', sort: 'description', path: 'description',  visible: true, isModelProperty: true },
        { name: 'Organizzatore', id: 'organiser.firstName', sort: 'organiser.firstName' , path: 'organiser.firstName', visible: true, isModelProperty: true },
        { name: 'Partecipanti', id: 'attendees.length', sort: 'attendees.length' , path: 'attendees.length', visible: true, isModelProperty: true },
    ]
    search: FormGroup;
    orderBy = 'title'
    sortDirection = 'ASC'
    pageIndex = 0
    eventPageSize: number = 5
    totalElement: number = 0

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventService: EventService,
                private formBuilder: FormBuilder) {

        this.search = formBuilder.group({
            searchValue: ['']
        })
    }

    ngOnInit() {
        this.eventData = this.activatedRoute.data.pipe(
            map( res => {
                this.totalElement = res['eventDashList'].totalElements ? res['eventDashList'].totalElements : 0
                this.eventPageSize = res['eventDashList'].size ? res['eventDashList'].size : 5

                return res['eventDashList'].content
            })
        );
        this.search.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
            this.reloadData()
        })
    }

    doLazyLoad( event: LazyLoadEvent ) {
        if (event.pageSize) {
            this.eventPageSize = event.pageSize;
        }
        this.pageIndex = event.pageIndex;
        if (event.direction) {
            this.sortDirection = event.direction;
        }
        if (event.active) {
            this.orderBy = event.active;
        }

        this.reloadData()
    }

    reloadData() {
        this.eventData = this.eventService.filter({
            ...this.search.value,
            orderBy: this.orderBy,
            sortDirection: this.sortDirection,
            pageNumber: this.pageIndex,
            pageSize: this.eventPageSize
        }).pipe(
            map(res => res.content)
        )
    }

    infoEvent($event: any) {
        console.log($event.data.url)
        this.router.navigate(['/dashboard/eventinfo', $event.data.url], {state: { event: $event.data }})
    }
}
