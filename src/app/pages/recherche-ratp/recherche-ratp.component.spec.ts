import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheRatpComponent } from './recherche-ratp.component';

describe('RechercheRatpComponent', () => {
  let component: RechercheRatpComponent;
  let fixture: ComponentFixture<RechercheRatpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheRatpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheRatpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
