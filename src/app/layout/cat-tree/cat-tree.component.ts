import {Component} from '@angular/core'

export interface CategoryElement {
    name: string,
    children?: CategoryElement[]
}

@Component({
    selector: 'app-cat-tree',
    templateUrl: './cat-tree.component.html',
    styleUrls: ['./cat-tree.component.css']
})
export class CatTreeComponent {

    lista: CategoryElement[] = [
        {name: 'Sport', children: [ {name: 'Calcio'}, {name: 'Basket'} ]},
        {name: 'Musica', children: [ {name: 'Concerti'}, {name: 'Rave'} ]},
        {name: 'Comizio'},
        {name: 'Giochi', children: [{name: 'Bambini'}]}
    ]

    toogleElement(elem: CategoryElement) {
        console.log(elem.name)
    }
}
