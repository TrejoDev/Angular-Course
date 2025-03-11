import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-sidemenu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidemenu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuOptionsComponent {
  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Pupular Gifs',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      subLabel: 'Gifs search',
    },
  ];
}
