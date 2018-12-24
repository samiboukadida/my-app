import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {inject, TestBed} from '@angular/core/testing';
import {SafePipe} from './safe.pipe';

describe('SanitiseHtmlPipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});


/*import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafePipe();
    expect(pipe).toBeTruthy();
  });
});*/
