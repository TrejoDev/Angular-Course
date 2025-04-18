import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  pages = input(0);
  currentPage = input<number>(1);
  activatePage = linkedSignal(() => this.currentPage()); //Es recomendable usar el linkedS cuando tenemos una señal que puede cambiar desde el imput
  //Es una señal que despues de ser inicializada se trabaja como una señal corriente
  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
