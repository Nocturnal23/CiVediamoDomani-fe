import {Component} from '@angular/core';
import {CategoryService} from "../../core/services/category.service";
import {CategoryDto} from "../../core/dto/category-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryCriteria} from "../../core/criteria/category-criteria";
import {map, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddCategoryComponent} from "../../layout/dialog-add-category/dialog-add-category.component";
@Component({
    selector: 'app-info-category',
    templateUrl: './info-category.component.html',
    styleUrls: ['./info-category.component.css']
})
export class InfoCategoryComponent {
    category: CategoryDto
    child: Observable<Array<CategoryDto>>
    categoryCriteria: CategoryCriteria = {}
    url: string
    buttonLabel: string
    constructor(private activatedRoute: ActivatedRoute,
                private categoryService: CategoryService,
                private router: Router,
                private dialog: MatDialog) {

        this.category = this.router.getCurrentNavigation()?.extras?.state?.['category']
        if (this.category) {
            this.buttonLabel = this.getButtonLabel()
            if (!this.isFather()) {
                this.getChild();
            }
        } else {
            this.activatedRoute.params.subscribe(({url}) => {
                this.url = url;
                this.categoryService.getByUrl(this.url).subscribe((category) => {
                    this.category = category;
                    this.buttonLabel = this.getButtonLabel();
                    if (!this.isFather()) {
                        this.getChild();
                    }
                });
            });
        }
    }

    private getButtonLabel(): string {
        return this.category?.deleted === 0 ? 'Disattiva' : 'Attiva';
    }

    isFather() {
        return !!this.category?.father;
    }

    private getChild() {
        this.categoryCriteria = { fatherID: this.category.id };
        this.child = this.categoryService.filter(this.categoryCriteria).pipe(
            map((child) => child.content)
        );
    }

    private addCategory(name: string) {
        let newCategory: CategoryDto = {
            id: 0,
            url: "",
            name: name.charAt(0).toUpperCase() + name.slice(1),
            father: this.category
        }
        this.categoryService.save(newCategory).subscribe( () =>
            this.reloadPage()
        )
    }

    private editCategory(name: string) {
        let editCat : CategoryDto = {
            ...this.category,
            name: name.charAt(0).toUpperCase() + name.slice(1),
        }
        this.categoryService.update(editCat).subscribe( () => {
            this.reloadPage()
        })
    }

    createCatDialog(title: string, placeholder:string) {
        let dialogContent = this.dialog.open(DialogAddCategoryComponent,
            { data: {
                dialogTitle: title,
                placeholderText: placeholder,
                inputType: 'text'}
            })
        dialogContent.afterClosed().subscribe(res => {
            if( dialogContent.componentInstance.newName != null && dialogContent.componentInstance.newName != "" ) {
                if (title === 'Modifica il nome della categoria') {
                    this.editCategory(dialogContent.componentInstance.newName)
                }
                if (title === 'Inserisci la nuova sottocategoria') {
                    this.addCategory(dialogContent.componentInstance.newName);
                }
            }
        })
    }

    changeState() {
        if (this.category.deleted == 0) {
            this.categoryService.delete(this.category.url).subscribe((category) => {
                if( category.father == null )
                    this.changeChildState();
                this.category = category;
                this.buttonLabel = this.getButtonLabel();
            });
        } else {
            this.categoryService.enable(this.category.url).subscribe((category) => {
                this.category = category;
                this.buttonLabel = this.getButtonLabel();
            });
        }
    }

    private reloadPage() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigateByUrl(currentUrl);
        });
    }

    private changeChildState() {
        this.child.subscribe((categories: CategoryDto[]) => {
            categories.forEach((category: CategoryDto) => {
                this.categoryService.delete(category.url).subscribe()
            });
        });
    }

}
