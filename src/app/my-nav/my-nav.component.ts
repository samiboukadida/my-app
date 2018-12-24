import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss'],
})
export class MyNavComponent implements OnInit, AfterViewInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  currentThemeName = 'candy';
  themeList: string[] = [
    'candy',
    'main',
    'alternate',
    'dark'
  ];

  constructor(private breakpointObserver: BreakpointObserver, private overlayContainer: OverlayContainer) {
    this.overlayContainer.getContainerElement().classList.add(this.currentThemeName);
  }

  setOldThemeName() {
  }

  chooseTheme(themeName) {
    this.currentThemeName = themeName;
    this.overlayContainer.getContainerElement().classList.add(this.currentThemeName);
  }

  ngOnInit(): void {
    this.setOldThemeName();

    /*_.remove(this.myContainer.classList.value.split(' '),
      (item) => {
        return this.themeList.indexOf(item) > -1;
      });*/
    // this.oldThemeName = this.myContainer.classList.value.split(' ');
  }

  ngAfterViewInit(): void {

  }
}
