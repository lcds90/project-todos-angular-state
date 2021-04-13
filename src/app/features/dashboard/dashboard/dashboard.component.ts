import { Component } from '@angular/core';
import { UserContextService } from 'src/app/shared/services/user-context.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public userContext: UserContextService) {
  }

}
