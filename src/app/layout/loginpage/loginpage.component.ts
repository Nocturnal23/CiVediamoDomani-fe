import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {


  container: any;
  login: boolean;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthenticationService) {

    this.login = true
  }
  ngOnInit() {
    this.container = document.getElementById('container');
  }


  switchForm() {
    if (this.login) {
      this.container.classList.add("right-panel-active");
      this.login = false;
    }
    else {
      this.container.classList.remove("right-panel-active");
      this.login = true;
    }
  }
}
