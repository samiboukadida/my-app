import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {MockApiDataSource, MockApiItem} from './mock-api-datasource';
import {ApiService} from '../services/api/api.service';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-mock-api',
  templateUrl: './mock-api.component.html',
  styleUrls: ['./mock-api.component.scss'],
})
export class MockApiComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MockApiDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'createdAt', 'name', 'avatar'];
  finalData: MockApiItem[] = [];
  filterTerm$ = new Subject<string>();
  console = console;
  showSpinner$ = new BehaviorSubject<boolean>(false);
  private getApiDataSubscription: Subscription;
  private filterTermSubscription: Subscription;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    const imgStyleObj = 'text-align:end; width: 15%; border-radius: 50%;';
    this.getApiDataSubscription = this.apiService.getMockApiData().pipe(
      tap(() => this.showSpinner$.next(true)),
      map((data) => {
        // console.log('item:', item);
        return data.map(
          (item) => {
            const avatar = '<img style="' + imgStyleObj + '"  mat-card-avatar src="' + item.avatar + '" alt="' + item.avatar + '">';
            return {...item, avatar: avatar};
            // console.log('newItem:', newItem);
          }
        );
      })
    )
      .subscribe(
        (mockData) => {
          this.finalData = mockData;
          this.dataSource = new MockApiDataSource(this.finalData, this.paginator, this.sort);
        },
        null,
        () => {
          console.log('getApiDataSubscription:complete');
          this.showSpinner$.next(false);
        }
      );
    /*********************/
    this.filterTermSubscription = this.filterTerm$.pipe(
      tap(() => this.showSpinner$.next(true)),
      debounceTime(500),
      distinctUntilChanged()
    )

      .subscribe(
        (input) => {
          // this.dataSource.filter = input.trim().toLowerCase();
          const result = this.finalData.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
          console.log('result:', result);
          this.dataSource = new MockApiDataSource(result, this.paginator, this.sort);
          // this.filterTerm$.complete();
          this.showSpinner$.next(false);
        },
        null,
        () => {
          console.log('filterTermSubscription:complete');

        }
      );
  }

  ngOnDestroy(): void {
    console.log('MOCK-API;COMPONENT::ngOnDestroy');
    this.getApiDataSubscription.unsubscribe();
    this.filterTermSubscription.unsubscribe();
  }
}
