import {Component, Input} from '@angular/core';

export interface TreeItem {
    title: string;
    description: string;
    childList: TreeItem[];
}

@Component({
    selector: 'app-tree-list',
    templateUrl: './tree-list.component.html',
    styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent {

    constructor() {

    }

    panelTitle: TreeItem = {
        title: 'This is the expansion title;',
        description: 'This is the description',
        childList: []
    }

    @Input() inputTree: TreeItem[] = [{
        title: 'Example title',
        description: 'Example description',
        childList: [{
            title: 'First Child title',
            description: 'First Child description',
            childList: [ {
                title: 'Lowest Child title',
                description: '',
                childList: []
            } ]
        }, {
            title: 'Second Child title',
            description: 'Second Child description',
            childList: []
        }] },
        {   title: 'Example title 2',
        description: '',
        childList: [{
            title: 'First Child title 2',
            description: '',
            childList: []
        }, {
            title: 'Second Child title 2',
            description: '',
            childList: []
        }] }
    ];

}
