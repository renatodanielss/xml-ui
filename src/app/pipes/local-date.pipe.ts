import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { LanguageService } from '../core/services/language.service';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  constructor(private translate: LanguageService) { }

  transform(value: any, format: string) {

    if (!value) { return ''; }
    if (!format) { format = 'shortDate'; }

    return formatDate(value, format, this.translate.locale);
  }
}