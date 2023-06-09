import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../../core/dto/user-dto";
import {UserService} from "../../core/services/user.service";
import {map, Observable} from "rxjs";
import {Page} from "../../core/commons/filter.response";
import {MatPaginator} from "@angular/material/paginator";
import {Column, LazyLoadEvent} from "../../layout/table";

@Component({
    selector: 'app-dashboard-user',
    templateUrl: './dashboard-user.component.html',
    styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

    userLenght: number
    userPageSize: number = 5
    userInter: Observable<Array<UserDto>>
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
        // this.userInter = this.activatedRoute.data.pipe(
        //   map( res => {
        //       this.userLenght = res['userList'].totalElements
        //       // console.log(this.userLenght)
        //       // this.userPageSize = res['userList'].pageSize
        //     return res['userList'].content
        //   })
        // );
        // this.userInter.subscribe(() => console.log(this.userInter) )
        this.userInter = this.userService.filter({}).pipe(
          map( res => { return res.content } )
        )
    }

    doLazyLoad( event: LazyLoadEvent ) {
      this.userInter = this.userService.filter({}).pipe(
        map( res => { return res.content } )
      )
    }
}
