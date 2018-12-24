import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {MatIconRegistry} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [ApiService, MatIconRegistry]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
