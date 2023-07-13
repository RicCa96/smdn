import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LangDropdownComponent} from './lang-dropdown.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {environment} from "../../../environments/environment";
/**
 * The unit tests for the LangDropdownComponent.
 *
 * @class LangDropdownComponentTests
 */
describe('LangDropdownComponent', () => {
  let component: LangDropdownComponent;
  let fixture: ComponentFixture<LangDropdownComponent>;
  let translateService: TranslateService;

  /**
   * Sets up the TestBed configuration for the LangDropdownComponent tests.
   *
   * @function beforeEach
   * @async
   * @returns {Promise<void>}
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LangDropdownComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [TranslateService]
    }).compileComponents();
  });

  /**
   * Initializes the component and its dependencies before each test.
   *
   * @function beforeEach
   * @returns {void}
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(LangDropdownComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  /**
   * Tests that the component is created successfully.
   *
   * @function it
   * @returns {void}
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests that the langOptions property is initialized correctly.
   *
   * @function it
   * @returns {void}
   */
  it('should initialize langOptions', () => {
    expect(component.langOptions).toEqual(environment.langOptions);
  });

  /**
   * Tests that the lang property is initialized with the first option.
   *
   * @function it
   * @returns {void}
   */
  it('should initialize lang with the first option', () => {
    expect(component.lang).toEqual(environment.langOptions[0]);
  });

  /**
   * Tests that the translateService.use() method is called when the translate() method is called.
   *
   * @function it
   * @returns {void}
   */
  it('should call translateService.use() when translate() is called', () => {
    spyOn(translateService, 'use');
    component.translate();
    expect(translateService.use).toHaveBeenCalledWith(component.lang);
  });
});
