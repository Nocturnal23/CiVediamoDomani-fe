import {Component, Input} from '@angular/core';

export interface TreeItem {
    title: string;
    description: string;

}

@Component({
    selector: 'app-tree-list',
    templateUrl: './tree-list.component.html',
    styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent {
    panelOpenState = false;
    panelTitle = 'This is the expansion title;'

    // @Input() inputTree: number[];

}
