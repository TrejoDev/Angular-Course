import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NabvarComponent } from '../components/shared/nabvar/nabvar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NabvarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bases';
}
