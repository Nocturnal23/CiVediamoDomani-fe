import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {RoleEnums, RoutingEnums} from "../utils/Enums";

function navigateToRoot() {
    inject(Router).navigate([`/${RoutingEnums.HOMEPAGE}`]).then();
}

export const isLoggedUser: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

        if(AuthenticationService.isLogged())
            return true;

        navigateToRoot();
        return false;
    };

export const canLogin: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if(!AuthenticationService.isLogged())
            return true;

        navigateToRoot();
        return false;
    };

export const isAdmin: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        let role = AuthenticationService.getAppUser?.appRole; //1 = Admin 2 = Normale.

        if( !!role && role === RoleEnums.ADMIN_ROLE )
            return true;

        navigateToRoot();
        return false;
    }
