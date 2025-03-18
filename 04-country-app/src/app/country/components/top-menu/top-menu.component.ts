import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  label: string;
  route: string;
}

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  menuOptions: MenuOptions[] = [
    {
      label: 'By Capital',
      route: '/country/by-capital',
    },
    {
      label: 'By Country',
      route: '/country/by-country',
    },
    {
      label: 'By Region',
      route: '/country/by-region',
    },
  ];
}
