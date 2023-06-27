import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-category',
  templateUrl: './dialog-add-category.component.html',
  styleUrls: ['./dialog-add-category.component.css']
})
export class DialogAddCategoryComponent {
  newCategory: FormGroup
  newName: string

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { dialogTitle: string }) {
    this.newCategory = formBuilder.group({
      name: ['']
    })
  }

  createCat() {
    this.newName = this.newCategory.value.name
  }
}
