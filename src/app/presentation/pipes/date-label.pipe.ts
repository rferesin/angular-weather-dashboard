import { Pipe, PipeTransform } from '@angular/core';

/** Formata datas em pt-BR sem precisar registrar locale do Angular. */
@Pipe({ name: 'dateLabel' })
export class DateLabelPipe implements PipeTransform {
  private static readonly DAY = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });

  private static readonly TIME = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  transform(value: Date, style: 'day' | 'time'): string {
    return (style === 'day' ? DateLabelPipe.DAY : DateLabelPipe.TIME).format(value);
  }
}
