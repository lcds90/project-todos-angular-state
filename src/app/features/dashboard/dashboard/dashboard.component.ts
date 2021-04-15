import { Component } from '@angular/core';
import { UserContextService } from 'src/app/shared/services/user-context.service';
import { AppState } from '../../../state/app.reducer';
import * as fromAppSelectors from '../../../state/app.selectors'
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  name$: Observable<string>;

  constructor(
    // public userContext: UserContextService,
    private store: Store<AppState>,
    ) {
      this.name$ = this.store.pipe(select(fromAppSelectors.selectUserName))
  }

}
