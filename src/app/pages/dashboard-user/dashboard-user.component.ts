import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../../core/dto/user-dto";
import {UserService} from "../../core/services/user.service";
import {map, Observable} from "rxjs";
import {Page} from "../../core/commons/filter.response";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  userLenght: number = 0
  userPageSize: number = 0
  userInter: UserDto[] = []
  displayedColumns: string[] = ["nome", "cognome", "tipoUtente", "eventiCreati"]
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator | undefined

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
      this.activatedRoute.data.subscribe(
        ({userList}) => {
          this.userInter = userList.content
          this.userLenght = userList.totalElements
          this.userPageSize = userList.pageSize
        });
    }
}
