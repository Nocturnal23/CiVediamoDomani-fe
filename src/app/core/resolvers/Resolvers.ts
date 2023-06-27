import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {EventService} from "../services/event.service";
import {inject} from "@angular/core";
import {EventDto} from "../dto/event-dto";
import {Page} from "../commons/filter.response";
import {UserDto} from "../dto/user-dto";
import {UserService} from "../services/user.service";
import {CategoryDto} from "../dto/category-dto";
import {CategoryService} from "../services/category.service";

export const searchResolver: ResolveFn<Page<EventDto>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(EventService).filter({searchValue: route.paramMap.get('query')!});
    };

export const usersResolver: ResolveFn<Page<UserDto>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(UserService).filter({pageSize: 5});
    };

export const eventResolver: ResolveFn<Page<EventDto>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(EventService).filter({pageSize: 5});
    };

export const categoryResolver: ResolveFn<Page<CategoryDto>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CategoryService).filter({pageSize: 5})
    }
