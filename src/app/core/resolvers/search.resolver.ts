import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EventService} from "../services/event.service";
import {EventCriteria} from "../criteria/event-criteria";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {EventDto} from "../dto/event-dto";
import {Page} from "../commons/filter.response";

@Injectable()
export class SearchResolver implements Resolve<any>{

    constructor(private _eventService: EventService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventDto[]> {
        let query = route.paramMap.get('query')
        console.log('ciao ciao')
        // if (query === null) {
            // let criteria : EventCriteria = { searchvalue: query }
            // let observ = this._eventService.filter({});
            // console.log('ciao ciao')
            // return observ;
        let observable = this._eventService.filter({}).pipe(map(res => res.content));
        console.log(observable);
        // @ts-ignore
        return observable;
        // }
        // @ts-ignore
        // return null;
    }

}
