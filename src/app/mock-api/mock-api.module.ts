import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MockApiComponent} from './mock-api.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {SharedComponentsModule} from '../shared-components/shared-components.module';

const routes: Routes = [
  {path: '', component: MockApiComponent}
];

@NgModule({
  declarations: [MockApiComponent],
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
export class MockApiModule {
}
