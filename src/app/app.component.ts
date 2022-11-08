import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'smdn';

  constructor(
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }

  translate(lang: string) {
    this.translateService.use(lang);
  }
}
