import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {EventDto} from "../dto/event-dto";
import {EventCriteria} from "../criteria/event-criteria";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";

@Injectable({ providedIn: 'root' })
export class EventService implements AbstractService<EventDto, EventCriteria> {
    private baseUrl: string;

    constructor(private _http: HttpClient) {
        this.baseUrl = '/adverts'
    }

    get(id: number | string): Observable<EventDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<EventDto>(url);
    }

    filter(criteria: EventCriteria): Observable<Page<EventDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<EventDto>>(url, criteria);
    }
}
