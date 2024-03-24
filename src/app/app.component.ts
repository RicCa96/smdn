import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {MenuService} from "./shared/services/menu.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  primengTranslation$: Subscription | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService,
    private menuService: MenuService
  ) {
  }

  ngOnInit() {
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
    this.primengTranslation$ = this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    this.initPrimeng();
    this.initMenu();
  }

  ngOnDestroy() {
    this.primengTranslation$?.unsubscribe();
    this.initPrimeng();
    this.initMenu();
  }

  initPrimeng(): void {
    this.translateService.get('primeng')
      .subscribe({
        next: res => this.primengConfig.setTranslation(res)
      });
  }

  initMenu(): void {
    this.translateService.get('menu')
      .subscribe({
        next: res => this.menuService.setTranslation(res)
      });
  }
}
