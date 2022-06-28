import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HelloworldComponent} from "./helloworld/helloworld.component";

const routes: Routes = [
  { path: 'helloworld', component: HelloworldComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
