import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByProp',
  pure: false
})
export class SortByPropPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }

    let key = Object.keys(filter)[0];
    let value = filter[key];
    let filteredItems = items.filter(i => i[key] == value);

    if(filteredItems.length > 0){
      let notFiltered = items.filter(i => i[key] != value);

      filteredItems.forEach(f => notFiltered.unshift(f));
      return notFiltered;
    }
    
    return items;
  }
}