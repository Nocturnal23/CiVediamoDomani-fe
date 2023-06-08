import {AfterViewInit, ChangeDetectionStrategy, Component,
    ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Column} from './column';
import {MatTableDataSource} from '@angular/material/table';
import {LazyLoadEvent} from './lazy-load-event';

@Directive({
    selector: '[appTableRowActions]',
})
export class TableRowActionsDirective {}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewInit {
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ContentChild(TableRowActionsDirective, {read: TemplateRef, static: false})
    tableRowActionsTemplateRef: TemplateRef<any>;

    @Input() lazyLoad: boolean;

    @Input() isLoading: boolean;

    @Input() enableFirstAction = true;
    @Input() enableSecondaryAction = false;

    @Input() firstActionButtonLabel = 'Visualizza';
    @Input() secondaryActionButtonLabel = 'Visualizza';


    @Input() firstActionButtonIcon = 'remove_red_eye';
    @Input() secondaryActionButtonIcon = 'remove_red_eye';

    @Input() showFirstActionColumn = false;
    @Input() showSecondaryActionColumn = false;

    @Input() firstActionColumnHeader = 'Info';
    @Input() secondaryActionColumnHeader = 'Info';


    @Input() columns: Array<Column>;

    @Input()
    set data(data: Array<any>) {
        this.dataSource.data = data || [];
    }

    @Input()
    set pageIndex(index: number) {
        this.paginator.pageIndex = index;
    }

    @Input() pageSize = 10;

    @Input() totalRecords: number;

    @Output() paginationEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    @Output() sortEvent: EventEmitter<Sort> = new EventEmitter<Sort>();

    @Output() firstActionRowEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Output() secondaryActionRowEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Output() lazyLoadEvent: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();

    dataSource: MatTableDataSource<any>;

    constructor() {
        this.dataSource = new MatTableDataSource(this.data);
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(this.onSortChange.bind(this))

        this.paginator.page.subscribe(this.onPaginationChange.bind(this))

        this.paginator._intl.itemsPerPageLabel = 'Elementi per pagina:';
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => { // from matPaginator git
            if (length === 0 || pageSize === 0) {
                return `0 da ${length}`; // change of => da
            }

            length = Math.max(length, 0);

            const startIndex = page * pageSize;

            const endIndex = startIndex < length ?
                Math.min(startIndex + pageSize, length) :
                startIndex + pageSize;

            return `${startIndex + 1} – ${endIndex} da ${length}`; // change of => da
        };

        if (!this.lazyLoad) {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }
    }

    onPaginationChange(event: PageEvent): void {
        this.paginationEvent.emit(event);
        this.doLazyLoad();
    }

    onSortChange(event: Sort): void {
        this.paginator.pageIndex = 0;
        this.sortEvent.emit(event);
        this.doLazyLoad();
    }

    doFirstActionEvent(event: any, row: any): void {
        this.firstActionRowEventEmitter.emit({
            ...event,
            data: row
        });
    }

    doSecondaryActionEvent(event: any, row: any): void {
        this.secondaryActionRowEventEmitter.emit({
            ...event,
            data: row
        });
    }

    doLazyLoad(): void {
        if (this.lazyLoad) {
            this.lazyLoadEvent.emit({
                pageIndex: this.paginator.pageIndex,
                pageSize: this.paginator.pageSize,
                active: this.sort.active,
                direction: this.sort.direction.toLocaleUpperCase()
            });
        }
    }

    get visibleColumns(): Array<string> {
        const defaultColumns: Array<string> = [];

        defaultColumns.push(...this.columns.filter(column => column.visible).map(column => column.id!));

        if (this.enableFirstAction) {
            defaultColumns.push('firstActions');
        }
        if (this.enableSecondaryAction) {
            defaultColumns.push('secondaryActions');
        }

        return [...defaultColumns];
    }

    get pageSizeOptions(): number[] {
        return [5, 10, 15, 25, 50, 100, 250, 500, 1000]
            .filter(option => option <= this.totalElements);
    }

    get totalElements(): number {
        return this.lazyLoad ?
            this.totalRecords :
            this.dataSource?.data?.length;
    }
}
