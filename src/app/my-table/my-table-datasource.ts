import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {EMPTY, merge, Observable, of as observableOf} from 'rxjs';

// TODO: Replace this with your own data model type
export interface MyTableItem {
  /*name: string;
  id: number;*/
  ville: string;
  tco_libelle: string;
  code_postal: any;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MyTableItem[] = [
  {ville: 'Austin', tco_libelle: 'Male', code_postal: 'Swimlane'},
  {ville: 'Dany', tco_libelle: 'Male', code_postal: 'KFC'},
  {ville: 'Molly', tco_libelle: 'Female', code_postal: 'Burger King'},
];

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<MyTableItem> {
  data: MyTableItem[] = [];

  constructor(public dataFromApi: MyTableItem[], public paginator: MatPaginator, public sort: MatSort,
  ) {
    super();
    this.data = dataFromApi;
    console.log('MyTableDataSource::constructor');
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MyTableItem[]> {
    console.log('MyTableDataSource::connect');
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      // this.paginator.page,
      // this.sort.sortChange
      this.paginator ? this.paginator.page : EMPTY,
      this.sort ? this.sort.sortChange : EMPTY
    ];

    // Set the paginator's length
    // this.paginator.length = this.data.length;
    if (this.paginator) {
      (this.paginator.length = this.data.length);
    }
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    console.log('MyTableDataSource::disconnect');
    console.log('MyTableDataSource::disconnect-- if (this.data)=>this.data==', this.data);
    if (this.data) {
      console.log('MyTableDataSource::disconnect-- if (this.data)=>this.data==', this.data);
      this.data = [];
    }
    console.log('MyTableDataSource::disconnect-- if (this.data)=>this.data== after reset', this.data);
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MyTableItem[]) {
    console.log('MyTableDataSource::getPagedData:: this.paginator = ', this.paginator);
    if (this.paginator) {

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data.splice(0);
    }

  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MyTableItem[]) {
    console.log('MyTableDataSource::getSortedData:: this.sort = ', this.sort);
    if (!this.sort) {
      return data;
    }
    if (this.sort && (!this.sort.active || this.sort.direction === '')) {
      return data;
    }

    return data.sort((a, b) => {

      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'ville' || 'tco_libelle' || 'code_postal':
          // return compare(`a.${this.sort.active}`, `a.${this.sort.active}`, isAsc);
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
