import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutComponent} from './layout.component';
import {MyNavComponent} from '../../my-nav/my-nav.component';
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from '../../app-routing.module';
import {FooterComponent} from '../footer/footer.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, MyNavComponent, FooterComponent],
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule, AppRoutingModule,
        MatIconModule,
        MatListModule,
        MatMenuModule, MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
