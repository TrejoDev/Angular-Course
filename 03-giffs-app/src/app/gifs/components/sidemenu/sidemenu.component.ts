import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidemenuHeaderComponent } from '../sidemenu-header/sidemenu-header.component';
import { SidemenuOptionsComponent } from '../sidemenu-options/sidemenu-options.component';

@Component({
  selector: 'gifs-sidemenu',
  imports: [SidemenuHeaderComponent, SidemenuOptionsComponent],
  templateUrl: './sidemenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuComponent {}
