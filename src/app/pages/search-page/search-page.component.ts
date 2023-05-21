import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {UserService} from "../../core/services/user.service";
import {CategoryService} from "../../core/services/category.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
  public searchLocation: string = '';
  public searchRange: number = 0;
  public sliderMinRange: number = 10;
  public sliderMaxRange: number = 100;
  public sliderStep: number = 10;
  public values: any = '';
  public stampa: any;
  public stampaUser: any;
  public stampaCategory: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: EventService,
              private userService: UserService,
              private categoryService: CategoryService
  ) {

    this.stampa = service.filter({}).subscribe()
    console.log(this.stampa)

    this.stampaUser = userService.filter({}).subscribe()
    console.log(this.stampaUser)

    this.stampaCategory = categoryService.filter({}).subscribe()
    console.log(this.stampaCategory)
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe( routeParams => {this._loadData(routeParams)} )
    this.searchLocation = 'Milano';
  }

  private _loadData( routeParams : any ) {
    this.values = routeParams['query']
    console.log("Da search-page: " + this.values)
  }
}
