import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {MyTableComponent} from './my-table.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';

const routes: Routes = [
  {path: '', component: MyTableComponent}
];


@NgModule({
  declarations: [MyTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MatCardModule
  ]
})
export class MyTableModule {
}
