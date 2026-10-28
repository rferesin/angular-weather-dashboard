import { Pipe, PipeTransform } from '@angular/core';

import { Temperature, TemperatureUnit } from '../../domain/value-objects/temperature';

/** {{ temperatura | temperature: 'celsius' }}  ->  "24°" */
@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {
  transform(value: Temperature, unit: TemperatureUnit): string {
    return `${Math.round(value.valueIn(unit))}°`;
  }
}
