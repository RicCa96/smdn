import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {LangDropdownComponent} from "./components/lang-dropdown/lang-dropdown.component";
import {NavComponent} from "./components/nav/nav.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ConfirmDialogModule,
    ToastModule,
    LangDropdownComponent,
    NavComponent,
    FontAwesomeModule
  ],
  providers: [
    TranslateService,
    ConfirmationService,
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
