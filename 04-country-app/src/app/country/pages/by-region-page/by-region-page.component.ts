import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-by-region-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  onSearch(value: string) {
    throw new Error('Method not implemented.');
  }
}
