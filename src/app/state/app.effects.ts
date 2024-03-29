import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login.service';
import * as fromAppActions from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private loginService: LoginService, private router: Router) {}

  doLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAppActions.doLogin),
        mergeMap(({ name, email }) => this.loginService.login(name, email)
        .pipe(
            map((user) => {
              this.router.navigate(["home"]);
              return fromAppActions.doLoginSuccess({ user });
            }),
            catchError(()=> of(fromAppActions.doLoginFailure()))
        ))
      )
  );
}
