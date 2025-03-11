import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-sidemenu-header',
  imports: [],
  templateUrl: './sidemenu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuHeaderComponent {
  envs = environment;
}
