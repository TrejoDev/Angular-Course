import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styles: `
  button{
     padding: 5px;
      margin: 5px 10px;
      width: 75 px;
  }
  `,
})
export class CounterPageComponent {
  counter = 0;
  counterSignal = signal(0);

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((v) => v + value);
  }

  reset() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
