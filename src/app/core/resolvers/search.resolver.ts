import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {EventService} from "../services/event.service";
import {inject, Injectable} from "@angular/core";
import {EventDto} from "../dto/event-dto";
import {Page} from "../commons/filter.response";

export const searchResolver: ResolveFn<Page<EventDto>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(SearchResolver).getEvents(route.paramMap.get('query')!);
    };

@Injectable()
export class SearchResolver {

    constructor(private _eventService: EventService) {
    }

    getEvents(query: string) {
        return this._eventService.filter({searchValue: query});
    }
}
