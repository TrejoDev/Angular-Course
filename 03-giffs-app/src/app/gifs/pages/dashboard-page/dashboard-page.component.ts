import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from '../../components/sidemenu/sidemenu.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SidemenuComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {}
