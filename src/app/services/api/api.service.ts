import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  URL_API_BASE,
  URL_MOCKAPI_API_BASE,
  URL_SEARCHDATAVERSE_API_BASE
} from '../../config/constants';
import {Observable, throwError} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.getSearchResult(term)),
      catchError(e => throwError(e))
    );
  }

  getSearchResult(term): Observable<any> {
    const route: any = URL_API_BASE;
    // dataset=liste-des-commerces-de-proximite-agrees-ratp&sort=code_postal&facet=tco_libelle&facet=code_postal
    const params = new HttpParams().set('dataset', term)
      .set('sort', 'code_postal')
      .set('facet', 'tco_libelle')
      .set('facet', 'code_postal')
      .set('rows', '60');

    return this.http.get(route, {params: params});
  }

  searchDataverse(terms: Observable<string>) {
    return terms.pipe(
      /*debounceTime(2000),
      distinctUntilChanged(),*/
      switchMap(term => this.getSearchDataverseResult(term)),
      catchError(e => throwError(e))
    );
  }

  getSearchDataverseResult(term): Observable<any> {
    const route: any = URL_SEARCHDATAVERSE_API_BASE + term;
    // https://api.github.com/legacy/repos/search/typescript?order=desc&c=angular
    // typescript?order=desc
    const params = new HttpParams().set('order', 'desc');

    return this.http.get(route, {params: params});
  }

  getMockApiData(): Observable<any> {
    return this.http.get(URL_MOCKAPI_API_BASE);
  }
}
