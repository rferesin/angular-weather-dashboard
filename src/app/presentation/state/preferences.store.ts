import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { GetPreferencesUseCase } from '../../application/use-cases/get-preferences.use-case';
import { SavePreferencesUseCase } from '../../application/use-cases/save-preferences.use-case';
import { UserPreferences } from '../../domain/entities/user-preferences';
import { TemperatureUnit } from '../../domain/value-objects/temperature';

/** Estado das preferências (tema e unidade). Aplica o tema no <html> via atributo data-theme. */
@Injectable({ providedIn: 'root' })
export class PreferencesStore {
  private readonly getPreferences = inject(GetPreferencesUseCase);
  private readonly savePreferences = inject(SavePreferencesUseCase);
  private readonly document = inject(DOCUMENT);

  private readonly state = signal<UserPreferences>(this.getPreferences.execute());

  readonly theme = computed(() => this.state().theme);
  readonly unit = computed(() => this.state().temperatureUnit);

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.theme();
    });
  }

  toggleTheme(): void {
    this.update(this.state().toggledTheme());
  }

  setUnit(unit: TemperatureUnit): void {
    this.update(this.state().withTemperatureUnit(unit));
  }

  private update(next: UserPreferences): void {
    this.state.set(next);
    this.savePreferences.execute(next);
  }
}
