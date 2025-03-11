import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { AddCharacterComponent } from '../../components/dragonball/add-character/add-character.component';
import { DragonballService } from '../../services/dragonball.service';

@Component({
  templateUrl: './dragonball-super.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CharacterListComponent, AddCharacterComponent],
})
export class DragonballSuperComponent {
  public dragonballService = inject(DragonballService);
}
