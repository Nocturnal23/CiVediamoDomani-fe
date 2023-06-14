import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, map, Observable, pairwise, startWith} from "rxjs";
import {UserDto} from "../../core/dto/user-dto";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {UserCriteria} from "../../core/criteria/user-criteria";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

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
    search: FormGroup

    criteria: UserCriteria = {};

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
        this.search.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
            this.criteria = {
            ...this.criteria, ...this.search.value
            }
            this.loadUsers()
        })

        this.userData = this.activatedRoute.data.pipe(
          map( res => {
              this.totalElement = res['userList'].totalElements
              this.userPageSize = res['userList'].pageSize
            return res['userList'].content
          })
        );
    }

    doLazyLoad( event: LazyLoadEvent ) {
        this.criteria = {...this.criteria, pageSize: event.pageSize, pageNumber: event.pageIndex}
        this.loadUsers()
    }

    loadUsers() {
        this.userData = this.userService.filter(this.criteria).pipe(
            map(res => res.content)
        );
    }

    infoUser($event: any) {
        this.router.navigate(['/userinfo', $event.data.url], {state: { user: $event.data }})
    }
}
