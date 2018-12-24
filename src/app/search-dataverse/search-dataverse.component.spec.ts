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

import {SearchDataverseComponent} from './search-dataverse.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../services/api/api.service';

describe('SearchDataverseComponent', () => {
  let component: SearchDataverseComponent;
  let fixture: ComponentFixture<SearchDataverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchDataverseComponent],
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
    fixture = TestBed.createComponent(SearchDataverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
