import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavComponent} from './nav.component';
import {MenuService} from '../../shared/services/menu.service';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let menuService: MenuService;
  let translateService: TranslateService;

  // Set up the component and its dependencies before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [MenuService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  // Test that the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test that the menu items are updated when the language is changed
  it('should update menu items when language is changed', () => {
    // Define a mock menu items array
    const menuItems: MenuItem[] = [
      {label: 'Home', icon: 'pi pi-home', routerLink: ['/home']},
      {label: 'About', icon: 'pi pi-info', routerLink: ['/about']},
      {label: 'Contact', icon: 'pi pi-envelope', routerLink: ['/contact']}
    ];
    // Mock the getUserMenu method of the MenuService to return the mock menu items array
    spyOn(menuService, 'getUserMenu').and.returnValue(menuItems);
    // Mock the subscribe method of the TranslateService to call through to the original method
    spyOn(translateService.onLangChange, 'subscribe').and.callThrough();
    // Trigger the onLangChange event of the TranslateService with a mock event containing the mock menu items array
    translateService.onLangChange.next({translations: {menu: menuItems}} as any);
    // Check that the getUserMenu method of the MenuService was called
    expect(menuService.getUserMenu).toHaveBeenCalled();
    // Check that the menuItems property of the component was updated correctly
    expect(component.menuItems).toEqual(menuItems);
  });
});
