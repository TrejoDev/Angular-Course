import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../interface/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  characters = input.required<Character[]>(); //Input desde otro componente
  listName = input.required<string>();
}
