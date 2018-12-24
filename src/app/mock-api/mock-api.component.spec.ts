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

import {MockApiComponent} from './mock-api.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {ApiService} from '../services/api/api.service';
import {HttpClientModule} from '@angular/common/http';

describe('MockApiComponent', () => {
  let component: MockApiComponent;
  let fixture: ComponentFixture<MockApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockApiComponent],
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
    fixture = TestBed.createComponent(MockApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
