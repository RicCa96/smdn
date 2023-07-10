import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangDropdownComponent } from './lang-dropdown.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {environment} from "../../../environments/environment";

describe('LangDropdownComponent', () => {
  let component: LangDropdownComponent;
  let fixture: ComponentFixture<LangDropdownComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LangDropdownComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })],
      providers: [TranslateService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangDropdownComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize langOptions', () => {
    expect(component.langOptions).toEqual(environment.langOptions);
  });

  it('should initialize lang with the first option', () => {
    expect(component.lang).toEqual(environment.langOptions[0]);
  });

  it('should call translateService.use() when translate() is called', () => {
    spyOn(translateService, 'use');
    component.translate();
    expect(translateService.use).toHaveBeenCalledWith(component.lang);
  });
});
