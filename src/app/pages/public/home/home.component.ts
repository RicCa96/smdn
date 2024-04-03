import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  standalone: true,
  imports: [RouterLink, TranslateModule]
})
export class HomeComponent {

  get translatePrefix(): string {
    return 'pages.public.home.';
  }

  constructor() {
  }

}
