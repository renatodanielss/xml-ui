import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';
import { LanguageService } from '../core/services/language.service'

@Pipe({
  name: 'localNumber',
})
export class LocalNumberPipe implements PipeTransform {

  constructor(private translate: LanguageService) { }

  transform(value: any, format: string) {
    if (value == null) { return ''; } // !value would also react to zeros.
    if (!format) { format = '.2-2'; }

    return formatNumber(value, this.translate.locale, format);
  }
}