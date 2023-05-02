import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
  public values: any = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe( routeParams => {this._loadData(routeParams)} )
  }

  private _loadData( routeParams : any ) {
    this.values = routeParams['query']
    console.log("Da search-page: " + this.values)
  }

}
