import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  user;

  constructor() {
    this.user = AuthenticationService.getAppUser?.firstName;
    //console.log(AuthenticationService.getAuthToken)
  }

}
