import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {MyTableDataSource, MyTableItem} from './my-table-datasource';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {ApiService} from '../services/api/api.service';
import {HttpErrorResponse} from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss'],
})
export class MyTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /*@ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }*/

  /*@ ViewChild(MatSort)
  set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }*/

  // @ViewChild(MatTable) myTable: MatTable<MyTableItem>;
  dataSource: MyTableDataSource;
  // @Input() dataSourceInput: any[];
  // @Input() displayedColumnsInput: string[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ville', 'tco_libelle', 'code_postal'];

  /**********************/
  currentPage$ = new BehaviorSubject<Number>(0);
  searchTerm$ = new Subject<string>();
  errorMessage$ = new BehaviorSubject<string>('');
  private searchTermSubscription: Subscription;
  showSpinner$ = new BehaviorSubject<boolean>(false);
  finalData: MyTableItem[] = [];

  /**********************/
  constructor(public apiService: ApiService) {
    console.log('MyTableComponent:constructor ,this.paginator===', this.paginator);
    if (this.paginator) {
      console.log('***********************MyTableComponent:constructor ,this.paginator===', this.paginator);
      this.dataSource = new MyTableDataSource(this.finalData, this.paginator, this.sort);
    }


    this.searchTermSubscription = this.searchTerm$.subscribe(
      (inputData) => {
        // this.errorMessage$.next('');
        this.doSearch(of(inputData));
      }
    );
  }

  /*setDataSourceAttributes() {
    console.log('this paginator: ', this.paginator);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }*/

  ngOnInit() {

  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // this.dataSource = null;
    // this.dataSource = new MyTableDataSource(this.finalData, this.paginator, this.sort);
    // this.doSearch(this.searchTerm$);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges:changes ', changes);
    // this.dataSource = new MyTableDataSource(this.finalData, this.paginator, this.sort);
  }

  /*ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.doSearch(this.searchTerm$);
  }*/

  doSearch(inputData$: Observable<string>) {
    this.showSpinner$.next(true);
    this.apiService.search(inputData$)
      .subscribe(response => {
          // let records = response.records;
          console.log('inside search subscription:response.records:', response.records);
          const rows = _.map(response.records, (item) => {
            return _.pick<any, any>((<any>item).fields, ['ville', 'tco_libelle', 'code_postal']);
          });
          console.log('inside search subscription:transformed response.records => rows:', rows);
          // this.dataSource.disconnect();
          this.finalData = Object.values(rows);
          console.log('inside search subscription:======finalData=====', this.finalData);
          // this.dataSource.data = finalData;
          this.dataSource = new MyTableDataSource(this.finalData, this.paginator, this.sort);
          // this.dataSource.data = {...Object.values(rows)};
          // this.dataSource.connect(this.myTable);

          console.log('inside search subscription:this.tableDataSource$:', this.dataSource.data);

          // this.dataAdapter = new jqx.dataAdapter(this.source);
        }
        ,
        (error: HttpErrorResponse) => {
          this.showSpinner$.next(false);
          console.log('inside search subscription::error=', error.message);
          this.errorMessage$.next(JSON.stringify(error.message));
          this.dataSource = new MyTableDataSource([], this.paginator, this.sort);
          // this.dataSource.connect();
        },
        () => {
          this.showSpinner$.next(false);
          this.errorMessage$.next('');
        });
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
