import {Observable} from "rxjs";
import {Page} from "../commons/filter.response";
import {Injectable} from "@angular/core";
import {BaseDto} from "../dto/base-dto";
import {BaseCriteria} from "../criteria/base-criteria";

@Injectable()
export abstract class AbstractService<D extends BaseDto, C extends BaseCriteria> {

    abstract filter(criteria: C): Observable<Page<D>>;
    abstract get(id: number | string): Observable<D>;
    // abstract save(dto: D): Observable<D>;
    // abstract update(dto: D): Observable<D>;
    // abstract delete(id: number | string): Observable<D>;

}
