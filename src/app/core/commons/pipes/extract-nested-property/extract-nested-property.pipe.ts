import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'extractNestedProperty'
})
export class ExtractNestedPropertyPipe implements PipeTransform {

    transform(value: any, path: string): any {
        return path.split('.').reduce((previous, current) =>  {
            const prop = previous[current];
            return prop !== undefined && prop !== null ? prop : '';
        }, value);
    }

} 
