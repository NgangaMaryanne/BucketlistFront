import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { BucketlistItemService} from '../_services/bucketlist-items.service';
@Component({
    selector: 'bl-it-update',
    moduleId: module.id,
    templateUrl:'item-update.component.html'
})
export class ItemUpdateComponent{
    model: any = {};
    loading = false;
    pageTitle: string = "Update Bucketlist";
    errorMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private itemService: BucketlistItemService,
    ){}
    updateItem(bucketid, itemId){
        //Updates a bucketlist item
        this.loading = true;
        let bucketId = + this._route.snapshot.params['bucketId'];
        let itemid = + this._route.snapshot.params['itemId'];
        this.itemService.updateItem(bucketId, itemid, this.model)
        .subscribe(
            data => {
                this.alertService.success('Item updated successfully', true);
                this.router.navigate(['/bucketlists/'+bucketId]);
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists/' +bucketId]);
                this.loading = false;
            });
        }
}