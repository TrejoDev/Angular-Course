import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import reactiveRoutes from '../../../reactive/reactives.routes';

interface MenuItem {
  route: string;
  title: string;
}

const reactivesItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactivesItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Country',
      route: './country',
    },
  ];
}
