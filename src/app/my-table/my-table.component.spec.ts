import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconRegistry,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import {MyTableComponent} from './my-table.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../services/api/api.service';

describe('MyTableComponent', () => {
  let component: MyTableComponent;
  let fixture: ComponentFixture<MyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        SharedComponentsModule,
        HttpClientModule
      ],
      providers: [ApiService, MatIconRegistry]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
