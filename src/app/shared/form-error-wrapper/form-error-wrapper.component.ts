import {
  Component,
  Input,
  OnChanges,
  OnInit,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-form-error-wrapper',
  templateUrl: './form-error-wrapper.component.html'
})
export class FormErrorWrapperComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public control: any;
  @Input()
  public controlName: string;
  @Input()
  public apiErrorType?: string;
  // TODO : How to pass apiServiceUrl
  @Input()
  public apiServiceUrl?: string;

  public apiErrorMessage: string;

  constructor() {

  }

  ngOnInit() {}

  ngOnChanges() {
  }

  ngAfterViewInit() {
    this.control.valueChanges.subscribe(() => {
      this.apiErrorMessage = '';
    });
  }

  hasError() {
    return (
      (this.control.errors && this.control.touched) || this.apiErrorMessage
    );
  }
}
