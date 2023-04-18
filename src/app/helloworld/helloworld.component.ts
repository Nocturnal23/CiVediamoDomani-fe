import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";

@Component({
  selector: 'app-helloworld',
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.css']
})
export class HelloworldComponent implements OnInit {
  title = 'civediamodomani-fe';

  constructor( private _userService: UserService ) { }

  ngOnInit(): void {
  }

  async logconsole(): Promise<void> {
    let response = await this._userService.get(1).toPromise();
    console.log(response);
  }

}
