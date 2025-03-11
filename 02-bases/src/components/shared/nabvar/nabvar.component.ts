import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NabvarComponent {}
