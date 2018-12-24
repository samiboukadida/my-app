import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MyNavComponent} from '../../my-nav/my-nav.component';
import {
  MatButtonModule,
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

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MyNavComponent, FooterComponent],
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        AppRoutingModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
