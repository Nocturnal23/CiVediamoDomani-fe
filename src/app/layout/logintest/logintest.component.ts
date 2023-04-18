import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-logintest',
  templateUrl: './logintest.component.html',
  styleUrls: ['./logintest.component.css']
})
export class LogintestComponent implements OnInit {


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
