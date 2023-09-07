import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLastName'
})
export class FirstLastNamePipe implements PipeTransform {

  constructor() { }

  transform(value: string) {
    if (!value) { return ''; }

    const split = value.split(' ');

    return split[0] + " " + split[split.length - 1];
  }
}