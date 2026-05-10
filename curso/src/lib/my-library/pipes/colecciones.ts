/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform, Predicate } from '@angular/core';
import { compare, isArray } from '../utils/utils';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, where: Predicate<any> = (_item: any) => true): any {
    return Array.isArray(value) ? value.filter(where) : value
  }
}

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform(value: any, config: any = '+'): any {
    if (!isArray(value)) return value;
    value = [...value]
    if (!isArray(config)) {
      config = [config]
    }
    if (config[0] === '+')
      return value.sort(compare)
    if (config[0] === '-')
      return (value as any[]).sort((a, b) => -compare(a, b))
    return (value as any[]).sort((a: any, b: any) => {
      for (let item of config) {
        const init = item.substring(0, 1);
        let factor = 1
        if (init === '-') {
          factor = -1
          item = item.substring(1)
        } else if (init === '+') {
          item = item.substring(1)
        }
        const result = factor * compare(a[item], b[item]);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    });
  }
}

