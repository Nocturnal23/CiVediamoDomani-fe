import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const isLoggedUser: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

        if(inject(AuthenticationService).isLogged())
            return true;

        inject(Router).navigate(['/homepage']).then();

        return false;
    };

export const canLogin: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if(!inject(AuthenticationService).isLogged())
            return true;

        inject(Router).navigate(['/homepage']).then();
        return false;
    };

export const isAdmin: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        let role = AuthenticationService.getAppUser?.appRole; //1 = Admin 2 = Normale.

        if( !!role && role == 1 )
            return true;

        inject(Router).navigate(['/homepage']).then();
        return false;
    }
