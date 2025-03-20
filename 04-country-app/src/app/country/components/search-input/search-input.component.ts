import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input.required<string>();
  initialValue = input<string>('');

  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); //Permite inicializar la señal con un proceso computacional

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
