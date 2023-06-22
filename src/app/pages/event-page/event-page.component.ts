import {Component, OnInit, ViewChild} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {MatTabGroup} from "@angular/material/tabs";
import {AuthenticationService} from "../../core/services/authentication.service";
import {EventService} from "../../core/services/event.service";
import {map, Observable} from "rxjs";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute, Router} from "@angular/router";
import {EventCriteria} from "../../core/criteria/event-criteria";

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
    @ViewChild(MatTabGroup)
    tabs?: MatTabGroup;

    eventListPartecipati: Observable<Array<EventDto>>
    eventListSalvati: Observable<Array<EventDto>>
    eventListCreati: Observable<Array<EventDto>>
    activeTab: number = 0

    eventCriteria: EventCriteria = {}
    displayedColumns: Column[] = [
        { name: 'Titolo', id: 'title', sort: 'title', path: 'title',  visible: true, isModelProperty: true },
        { name: 'Descrizione', id: 'description', sort: 'description', path: 'description',  visible: true, isModelProperty: true }
    ]

    pageSize: number = 5
    pageIndex: number = 0
    totalElements: number = 5

    constructor(private eventService: EventService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadData()
    }

    changedTab($event) {
        this.activeTab = $event.index
        this.pageSize = 5
        this.pageIndex = 0
        this.loadData()
    }

    doLazyLoad(event: LazyLoadEvent) {
        if (event.pageSize)
            this.pageSize = event.pageSize
        this.pageIndex = event.pageIndex

        this.loadData()
    }

    loadData() {
        this.eventCriteria = {
            attendeeId: this.activeTab === 0? AuthenticationService.getAppUser.id : null,
            followerId: this.activeTab === 1? AuthenticationService.getAppUser.id : null,
            organiserId: this.activeTab === 2? AuthenticationService.getAppUser.id : null,
            pageSize: this.pageSize,
            pageNumber: this.pageIndex
        }

        if( this.activeTab == 0 )
            this.eventListPartecipati = this.load()

        if( this.activeTab == 1 )
            this.eventListSalvati = this.load()

        if( this.activeTab == 2 )
            this.eventListCreati = this.load()
    }

    load() {
        return this.eventService.filter(this.eventCriteria).pipe(
            map( res => {
                this.totalElements = res.totalElements
                return res.content
            })
        )
    }

    infoEvent($event: any) {
        this.router.navigate(['/infoevent', $event.data.url], {state: { event: $event.data }})
    }
}
