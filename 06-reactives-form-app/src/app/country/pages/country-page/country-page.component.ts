import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal<string[]>(this.countryService.regions);

  countriesByRegions = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChange = effect((onCleanup) => {
    //Revisamos los cambios con effect para poder limpias las subs
    const regionSubs = this.onRegionChanged();
    const countrySubs = this.onCountryChange();

    onCleanup(() => {
      regionSubs.unsubscribe();
      countrySubs.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => this.borders.set([])),
        tap(() => this.countriesByRegions.set([])),
        switchMap((region) =>
          this.countryService.getCountryByRegions(region ?? '')
        )
      )
      .subscribe((countries) => {
        console.log({ countries });

        this.countriesByRegions.set(countries);
      });
  }

  onCountryChange() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders)
        )
      )
      .subscribe((borders) => {
        console.log(borders);
        this.borders.set(borders);
      });
  }
}
