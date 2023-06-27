import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {EventDto} from "../dto/event-dto";
import {EventCriteria} from "../criteria/event-criteria";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class EventService implements AbstractService<EventDto, EventCriteria> {
    private baseUrl: string;

    constructor(private _http: HttpClient) {
        this.baseUrl = environment.BE_URL + '/events'
    }

    get(id: number | string): Observable<EventDto> {
        const url = this.baseUrl + '/' + id;
        return this._http.get<EventDto>(url);
    }

    filter(criteria: EventCriteria): Observable<Page<EventDto>> {
        const url = this.baseUrl + '/filter';
        return this._http.post<Page<EventDto>>(url, criteria);
    }

    save(dto: EventDto): Observable<EventDto> {
        return this._http.post<EventDto>(this.baseUrl, dto);
    }

    getByUrl(uniqueUrl: string): Observable<EventDto> {
        const url = this.baseUrl + '/getByUrl/' + uniqueUrl;
        return this._http.get<EventDto>(url);
    }

    delete(url: string): Observable<any> {
        return this._http.delete<any>(`${this.baseUrl}/${url}`);
    }

    update(dto: EventDto): Observable<EventDto> {
        const url = this.baseUrl + '/' + dto.url
        return this._http.put<EventDto>(url, dto);
    }
}
