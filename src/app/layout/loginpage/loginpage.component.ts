import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {


  container: any;

  ngOnInit() {
    this.container = document.getElementById('container');
  }

  signUp() {
    // @ts-ignore
    this.container.classList.add("right-panel-active");
    console.log('ciao')
  }

  signIn() {
    // @ts-ignore
    this.container.classList.remove("right-panel-active");
  }
}
