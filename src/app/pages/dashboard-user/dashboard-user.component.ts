import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../../core/dto/user-dto";
import {UserService} from "../../core/services/user.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  userData: Observable<UserDto[]> | undefined
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( routeParams => {

      // @ts-ignore
      this.userData = this.userService.filter({}).pipe(map(res => res.content));
    })
  }
}
