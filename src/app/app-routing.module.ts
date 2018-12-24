import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  /*{path: '', component: HomeComponent},*/
  {path: '', loadChildren: './pages/home/home.module#HomeModule'},
  // {path: 'recherche-ratp', component: MyTableComponent},
  {
    path: 'recherche-ratp',
    loadChildren: './my-table/my-table.module#MyTableModule'
  },
  /*{path: 'recherche-dataverse', component: SearchDataverseComponent},*/
  {
    path: 'recherche-github',
    loadChildren: './search-dataverse/search-dataverse.module#SearchDataverseModule'
  },
  /*{path: 'mock-api', component: MockApiComponent},*/
  {path: 'mock-api', loadChildren: './mock-api/mock-api.module#MockApiModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
