import {Component, OnInit} from '@angular/core';
import {debounceTime, map, Observable} from "rxjs";
import {UserDto} from "../../core/dto/user-dto";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {UserCriteria} from "../../core/criteria/user-criteria";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-dashboard-user',
    templateUrl: './dashboard-user.component.html',
    styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
    userData: Observable<Array<UserDto>>
    displayedColumns: Column[] = [
        { name: 'Nome', id: 'firstName', sort: 'firstName', path: 'firstName',  visible: true, isModelProperty: true },
        { name: 'Cognome', id: 'lastName', sort: 'lastName' , path: 'lastName', visible: true, isModelProperty: true },
        { name: 'Tipo Utente', id: 'appRole', sort: 'appRole' , path: 'appRole', visible: true, isModelProperty: true },
        { name: 'Eventi Creati', id: 'organisedEvents.length', sort: 'organisedEvents.length' , path: 'organisedEvents.length', visible: true, isModelProperty: true },
        { name: 'Stato utente', id: 'state', sort: 'state' , path: 'state', visible: true, isModelProperty: true }
    ]
    search: FormGroup
    orderBy = 'firstName'
    sortDirection = 'ASC'
    pageIndex = 0
    userPageSize = 5
    totalElement = 0

    constructor(private activatedRoute: ActivatedRoute,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.search = formBuilder.group({
            firstNameSearch: [''],
            lastNameSearch: ['']
        })
    }

    ngOnInit() {
        this.userData = this.activatedRoute.data.pipe(
            map( res => {
                this.totalElement = res['userList'].totalElements ? res['userList'].totalElements : 0
                this.userPageSize = res['userList'].size ? res['userList'].size : 5

                return res['userList'].content
            })
        );
        this.search.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
            this.reloadData()
        })
    }

    doLazyLoad( event: LazyLoadEvent ) {
        if (event.pageSize) {
            this.userPageSize = event.pageSize;
        }
        this.pageIndex = event.pageIndex;
        if (event.direction) {
            this.sortDirection = event.direction;
        }
        if (event.active) {
            this.orderBy = event.active;
        }

        this.reloadData()
    }

    reloadData() {
        this.userData = this.userService.filter({
            ...this.search.value,
            orderBy: this.orderBy,
            sortDirection: this.sortDirection,
            pageNumber: this.pageIndex,
            pageSize: this.userPageSize
        }).pipe(
            map(res => res.content)
        )
    }

    infoUser($event: any) {
        this.router.navigate(['/dashboard/userinfo', $event.data.url], {state: { user: $event.data }})
    }
}
