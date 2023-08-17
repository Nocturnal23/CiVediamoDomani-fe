import {SelectionModel} from '@angular/cdk/collections'
import {FlatTreeControl} from '@angular/cdk/tree'
import {Component, Injectable} from '@angular/core'
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree'
import {BehaviorSubject} from 'rxjs'

export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
}

export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}

const TREE_DATA = {
    Groceries: {
        'Almond Meal flour': null,
        'Organic eggs': null,
        'Protein Powder': null,
        Fruits: {
            Apple: null,
            Berries: ['Blueberry', 'Raspberry'],
            Orange: null,
        },
    },
    Reminders: ['Cook dinner', 'Read the Material Design spec', 'Upgrade Application to Angular'],
};
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] { return this.dataChange.value;}

    constructor() {
        this.initialize();
    }

    initialize() {
        const data = this.buildFileTree(TREE_DATA, 0);
        this.dataChange.next(data); // Notify the change.
    }

    buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            console.log(value)
            const node = new TodoItemNode();
            node.item = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.item = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }
}

@Component({
    selector: 'app-treetest',
    templateUrl: './treetest.component.html',
    styleUrls: ['./treetest.component.css'],
    providers: [ChecklistDatabase]
})
export class TreetestComponent {
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

    constructor(private _database: ChecklistDatabase) {
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren,
        );
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        _database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
        flatNode.item = node.item;
        flatNode.level = level;
        flatNode.expandable = !!node.children?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.length > 0 && descendants.every(child => {
            return this.checklistSelection.isSelected(child);
        });
    }

    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    toogleSelection (node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
        const descendants = this.treeControl.getDescendants(node);
        if (!!descendants) {
            this.checklistSelection.isSelected(node) ?
                this.checklistSelection.select(...descendants) : this.checklistSelection.deselect(...descendants)
            descendants.forEach(child => this.checklistSelection.isSelected(child))
        }
    }

    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descAllSelected = this.descendantsAllSelected(node)
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);
        if (currentLevel > 0) {
            const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

            for (let i = startIndex; i >= 0; i--) {
                const currentNode = this.treeControl.dataNodes[i];

                if (this.getLevel(currentNode) < currentLevel) {
                    return currentNode;
                }
            }
        }
        return null;
    }
}
