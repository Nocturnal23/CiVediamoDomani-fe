import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {UserDto} from "../../core/dto/user-dto";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {UserCriteria} from "../../core/criteria/user-criteria";

@Component({
    selector: 'app-dashboard-user',
    templateUrl: './dashboard-user.component.html',
    styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

    totalElement: number
    userPageSize: number
    userData: Observable<Array<UserDto>>
    displayedColumns: Column[] = [
      { name: 'Nome', id: 'firstName', sort: 'firstName', path: 'firstName',  visible: true, isModelProperty: true },
      { name: 'Cognome', id: 'lastName', sort: 'lastName' , path: 'lastName', visible: true, isModelProperty: true },
      { name: 'Tipo Utente', id: 'appRole', sort: 'appRole' , path: 'appRole', visible: true, isModelProperty: true },
      { name: 'Eventi Creati', id: 'organisedEvents', sort: 'organisedEvents' , path: 'organisedEvents', visible: true, isModelProperty: true }
    ]

    constructor(private activatedRoute: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userData = this.activatedRoute.data.pipe(
          map( res => {
              this.totalElement = res['userList'].totalElements
              this.userPageSize = res['userList'].pageSize
            return res['userList'].content
          })
        );

        // this.userInter = this.userService.filter({}).pipe(
        //   map( res => { return res.content } )
        // )
    }

    doLazyLoad( event: LazyLoadEvent ) {
      const criteria: UserCriteria = {pageSize: event.pageSize, pageNumber: event.pageIndex}
      this.userData = this.userService.filter(criteria).pipe(
        map( res => { return res.content } )
      )
    }
}
