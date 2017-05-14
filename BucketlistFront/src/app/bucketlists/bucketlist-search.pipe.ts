import {PipeTransform, Pipe} from '@angular/core';
import {IBucketlist} from '../_models/bucketlist';

@Pipe({
    name: 'bucketlistSearch'
})
export class BucketlistSearchPipe implements PipeTransform {
    transform (value: IBucketlist[], filterBy: string): IBucketlist[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((bucketlist : IBucketlist) => 
        bucketlist.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }

}