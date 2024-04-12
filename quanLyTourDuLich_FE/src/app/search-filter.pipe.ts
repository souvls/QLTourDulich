import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter((item) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const fieldValue = item[key];
          if (
            (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
            fieldValue.toString().toLocaleLowerCase().includes(searchText)
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }
}
