import {Component, OnInit} from '@angular/core';
import {debounceTime, map, Observable} from "rxjs";
import {CategoryDto} from "../../core/dto/category-dto";
import {Column, LazyLoadEvent} from "../../layout/table";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../core/services/category.service";
import {CategoryCriteria} from "../../core/criteria/category-criteria";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddCategoryComponent} from "../../layout/dialog-add-category/dialog-add-category.component";

@Component({
  selector: 'app-dashboard-categories',
  templateUrl: './dashboard-categories.component.html',
  styleUrls: ['./dashboard-categories.component.css']
})
export class DashboardCategoriesComponent implements OnInit {
    search: FormGroup

    categoryData: Observable<Array<CategoryDto>>
    displayedColumns: Column[] = [
        { name: 'Categoria', id: 'name', sort: 'name', path: 'name',  visible: true, isModelProperty: true },
        { name: 'Macrocategoria', id: 'father.name', sort: 'father.name' , path: 'father.name', visible: true, isModelProperty: true },
        // { name: 'Numero sottocategorie', id: '', sort: '' , path: '', visible: true, isModelProperty: true },
        ]
    pageSize: number
    totalElement: number
    criteria: CategoryCriteria = {}

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private categoryService: CategoryService,
                private dialog: MatDialog) {

        this.search = formBuilder.group({
            childCategorySearch: ['']
        })
    }

    ngOnInit() {
        this.search.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
            this.criteria = {...this.criteria, ...this.search.value}
            this.loadCategory()
        })

        this.categoryData = this.activatedRoute.data.pipe(
            map( res => {
                this.totalElement = res['categoryDashList'].totalElements
                this.pageSize = res['categoryDashList'].pageSize
                return res['categoryDashList'].content
            })
        );
    }

    createCatDialog(title: string) {
        let dialogContent = this.dialog.open(DialogAddCategoryComponent,
            { data: { dialogTitle: title }
            })
        dialogContent.afterClosed().subscribe(res => {
            if( dialogContent.componentInstance.newName != null && dialogContent.componentInstance.newName != "" ) {
                if (title === 'Inserisci la nuova macrocategoria') {
                    this.addCategory(dialogContent.componentInstance.newName);
                }
            }
        })
    }

    private addCategory(name: string) {
        let newCategory: CategoryDto = {
            id: 0,
            url: "",
            name: name.charAt(0).toUpperCase() + name.slice(1),
            father: null
        }
        this.categoryService.save(newCategory).subscribe( () =>
            this.router.navigateByUrl("/dashboard/category")
        )
    }

    doLazyLoad( event: LazyLoadEvent ) {
        this.criteria = {...this.criteria, pageSize: event.pageSize, pageNumber: event.pageIndex}
        this.loadCategory()
    }

    private loadCategory() {
        this.categoryData = this.categoryService.filter(this.criteria).pipe(
            map(res => res.content)
        )
    }

    infoCategory($event: any) {
        this.router.navigate(['/dashboard/categoryinfo', $event.data.url], {state: {category: $event.data}})
    }
}