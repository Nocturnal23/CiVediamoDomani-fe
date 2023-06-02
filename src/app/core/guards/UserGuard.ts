import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const isLoggedUser: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

        if(inject(AuthenticationService).isLogged())
            return true;

        let _router = inject(Router)
        _router.navigate(['/homepage']).then();

        return false;
    };

