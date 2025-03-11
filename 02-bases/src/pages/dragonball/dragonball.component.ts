import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

interface Characters {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  // imports: [NgClass],
  templateUrl: './dragonball.component.html',
  styleUrl: './dragonball.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragonballComponent {
  name = signal<string>('Gohan');
  power = signal<number>(1000);

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Characters = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };
    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

  characters = signal<Characters[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9001,
    },
    {
      id: 2,
      name: 'Veguetta',
      power: 8000,
    },
    {
      id: 3,
      name: 'Piccolo',
      power: 3000,
    },
    {
      id: 4,
      name: 'Yamcha',
      power: 400,
    },
  ]);

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });
}
