import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {
  SearchDataverseDataSource,
  SearchDataverseItem
} from './search-dataverse-datasource';
import {ApiService} from '../services/api/api.service';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import * as _ from 'lodash';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search-dataverse',
  templateUrl: './search-dataverse.component.html',
  styleUrls: ['./search-dataverse.component.scss'],
})
export class SearchDataverseComponent implements OnInit, OnDestroy {
  static increment = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SearchDataverseDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'username', 'name', 'owner'];

  searchTerm$ = new Subject<string>();
  finalData: SearchDataverseItem[] = [];
  errorMessage$ = new BehaviorSubject<string>('');
  showSpinner$ = new BehaviorSubject<boolean>(false);
  private searchTermSubscription: Subscription;


  constructor(private apiService: ApiService) {
    if (this.paginator) {
      this.dataSource = new SearchDataverseDataSource(this.finalData, this.paginator, this.sort);
    }
    this.declareSubscribers();

  }

  doSearch(inputData$: Observable<string>): any {
    SearchDataverseComponent.increment++;
    this.showSpinner$.next(true);
    console.log('SearchDataverseComponent.increment===', SearchDataverseComponent.increment);
    this.apiService.searchDataverse(inputData$)
      .subscribe(response => {
          console.log('inside search subscription:' + SearchDataverseComponent.increment + '======finalData=====', this.finalData);
          // let records = response.records;
          // console.log('inside search subscription:response.records:', response.repositories);
          this.finalData = _.map(response.repositories, (item) => {
            return _.pick(item, this.displayedColumns);
          });
          // this.finalData = response.repositories;

          // this.dataSource.data = finalData;
          this.dataSource = new SearchDataverseDataSource(this.finalData, this.paginator, this.sort);
          this.showSpinner$.next(false);
          // this.dataSource.data = {...Object.values(rows)};
          // this.dataSource.connect(this.myTable);

          // console.log('inside search subscription:this.tableDataSource$:', this.dataSource.data);

          // this.dataAdapter = new jqx.dataAdapter(this.source);
        }
        ,
        (error: HttpErrorResponse) => {
          this.showSpinner$.next(false);
          console.log('inside search subscription::error=', error.message);
          this.errorMessage$.next(JSON.stringify(error.message));
          this.dataSource = new SearchDataverseDataSource([], this.paginator, this.sort);
          // this.dataSource.connect();
        },
        () => {
          this.showSpinner$.next(false);
          this.errorMessage$.next('');
        });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.searchTermSubscription.unsubscribe();
    this.showSpinner$.complete();
    this.errorMessage$.complete();

  }

  private declareSubscribers() {
    // SerchTerm Subscriber
    this.searchTermSubscription = this.searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((input) => this.apiService.searchDataverse(of(input))),
      map((response) => response.repositories)
    )
      .subscribe(
        (response) => {
          this.consumeData(response);
        },
        (error) => {
          this.showSpinner$.next(false);
          console.log('inside search subscription::error=', error.message);
          this.errorMessage$.next(JSON.stringify(error.message));
          this.dataSource = new SearchDataverseDataSource([], this.paginator, this.sort);
        },
        () => {
          this.showSpinner$.next(false);
          this.errorMessage$.next('');
        }
      );
  }

  private consumeData(response: SearchDataverseItem[]) {
    this.finalData = _.map(response, (item) => {
      return _.pick(item, this.displayedColumns);
    });
    this.dataSource = new SearchDataverseDataSource(this.finalData, this.paginator, this.sort);
    this.showSpinner$.next(false);

  }


}
