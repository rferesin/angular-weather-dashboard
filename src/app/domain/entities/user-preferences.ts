import { TemperatureUnit } from '../value-objects/temperature';
import { ThemeMode } from '../value-objects/theme-mode';

/** Preferências do usuário. Imutável: cada alteração gera uma nova instância. */
export class UserPreferences {
  constructor(
    readonly theme: ThemeMode,
    readonly temperatureUnit: TemperatureUnit,
  ) {}

  static defaults(): UserPreferences {
    return new UserPreferences('light', 'celsius');
  }

  withTheme(theme: ThemeMode): UserPreferences {
    return new UserPreferences(theme, this.temperatureUnit);
  }

  withTemperatureUnit(unit: TemperatureUnit): UserPreferences {
    return new UserPreferences(this.theme, unit);
  }

  toggledTheme(): UserPreferences {
    return this.withTheme(this.theme === 'dark' ? 'light' : 'dark');
  }
}
