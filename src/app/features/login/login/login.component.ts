import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '../../../state/app.reducer';
import * as fromAppActions from '../../../state/app.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private Router: Router, private store: Store<AppState>) {}

  login() {
    this.store.dispatch(fromAppActions.doLogin(this.form.value));
  }
}
