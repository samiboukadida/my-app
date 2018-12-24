import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';

// TODO: Replace this with your own data model type
export interface SearchDataverseItem {
  type: string;
  username: string;
  name: string;
  owner: string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: SearchDataverseItem[] = [
const EXAMPLE_DATA = [
  {
    type: 'repo',
    username: 'Microsoft',
    name: 'TypeScript',
    owner: 'Microsoft'

  }, {
    type: 'repo',
    username: 'zhongsp',
    name: 'TypeScript',
    owner: 'zhongsp',
  }, {
    type: 'repo',
    username: 'Microsoft',
    name: 'TypeScriptSamples',
    owner: 'Microsoft',

  }, {
    type: 'repo',
    username: 'basarat',
    name: 'typescript-book',
    owner: 'basarat',

  }, {
    type: 'repo',
    username: 'Microsoft',
    name: 'TypeScript-React-Starter',
    owner: 'Microsoft',

  }
];

/**
 * Data source for the SearchDataverse view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SearchDataverseDataSource extends DataSource<SearchDataverseItem> {
  data: SearchDataverseItem[] = EXAMPLE_DATA;

  constructor(public dataFromApi: SearchDataverseItem[], public paginator: MatPaginator, public sort: MatSort) {
    super();
    this.data = dataFromApi;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SearchDataverseItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SearchDataverseItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SearchDataverseItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name' || 'username' || 'type' || 'owner':
          return compare(a[this.sort.active], b[this.sort.active], isAsc);
        /*case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);*/
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
