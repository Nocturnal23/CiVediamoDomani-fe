import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";

@Component({
  selector: 'app-helloworld',
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.css']
})
export class HelloworldComponent implements OnInit {
  title = 'checasavuoi-fe';

  constructor( private _userService: UserService ) { }

  ngOnInit(): void {
  }

  async logconsole(): Promise<void> {
    let response = this._userService.get(1);
    console.log(response);
  }

}
