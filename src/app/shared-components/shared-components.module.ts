import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSpinner} from '@angular/material';
import {SafePipe} from '../pipes/safe.pipe';

@NgModule({
  declarations: [MatSpinner, SafePipe],
  imports: [
    CommonModule
  ],
  exports: [
    MatSpinner,
    SafePipe
  ]
})
export class SharedComponentsModule {
}
