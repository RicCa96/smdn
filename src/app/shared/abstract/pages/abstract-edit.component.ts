import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Directive, inject, OnDestroy, OnInit} from '@angular/core';
import {ViewMode} from 'src/app/shared/enums/view-mode';
import {AbstractCrudService} from '../services/abstract-crud.service';
import {BaseModel} from '../../model/base.model';
import {AbstractComponent} from './abstract.component';
import {ConfirmationService} from "primeng/api";

@Directive()
export abstract class AbstractEditComponent<T extends BaseModel> extends AbstractComponent implements OnInit, OnDestroy {

  // Injections
  protected confirmationService = inject(ConfirmationService);

  public mode = ViewMode.CREATE;
  private elementId: string | undefined;

  form: FormGroup | undefined;
  element: T | undefined;

  protected constructor(
    private service: AbstractCrudService<T>,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
    this.route.paramMap
      .subscribe({
        next: (paramMap: ParamMap) => {
          if (paramMap.has(`id`)) {
            this.mode = ViewMode.EDIT;
            this.elementId = paramMap.get(`id`) as string;
            this.loading = true;
            this.service.byId(this.elementId)
              .subscribe({
                next: response => {
                  this.element = {...response};
                  this.afterOnInit();
                  this.loading = false;
                },
                error: () => {
                  this.loading = false;
                }
              });
          } else {
            this.mode = ViewMode.CREATE;
            this.elementId = undefined;
          }
        }
      });
  }

  afterOnInit(): void {
    this.updateForm();
  }

  onSaveClick(): void {
    if (!this.form || this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.mode === ViewMode.CREATE) {
      this.service.create(this.getNewElement())
        .subscribe({
          next: () => this.navigateToList()
        });
      this.loading = false;
    } else if (this.mode === ViewMode.EDIT) {
      const newElement = this.getNewElement();
      if (!this.elementId) {
        return;
      }
      newElement._id = this.elementId;
      this.service.updateOne(newElement)
        .subscribe({
          next: () => this.navigateToList()
        });
      this.loading = false;
    }
    this.form.reset();
  }

  onDeleteClick(): void {
    this.translateService.get('generic.messages.confirm-deletion')
      .subscribe({
        next: value => this.confirmationService.confirm({
          message: value,
          accept: () => this.doDelete(),
          reject: () => {}
        })
      });
  }

  doDelete(): void {
    if (!this.elementId) {
      return;
    }
    this.service.deleteOne(this.elementId)
      .subscribe({
        next: () => this.navigateToList()
      });
  }

  abstract getNewElement(): T;

  abstract buildForm(): void;

  abstract updateForm(): void;

  abstract navigateToList(): void;

}
