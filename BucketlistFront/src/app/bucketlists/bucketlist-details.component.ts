import { Component, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { IBucketlist} from '../_models/bucketlist';
import {IItem } from '../_models/item';
import { AlertService } from '../_services/alert.service';
import {BucketlistService } from '../_services/bucketlists.service';
import { BucketlistItemService } from '../_services/bucketlist-items.service';

@Component({
    templateUrl: 'bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit {
    pageTitle = 'This one bucketlist';
    bucketlist: IBucketlist;
    bucketlistItems: any = [];
    errorMessage: string;
    model: any = {};
    bucketId = + this._route.snapshot.params['bucketId'];
    itemId: number;

    constructor(private _router: Router,
                private zone: NgZone,
                private _route: ActivatedRoute,
                private alertService: AlertService,
                private bucketlistService: BucketlistService,
                private itemService: BucketlistItemService) {}
    ngOnInit() {
        this.getOneBucket();
    }
    refreshPage() {
        this.zone.runOutsideAngular(() => {location.reload(); });
    }
    getOneBucket() {
        this.bucketlistService.getOneBucketlist(this.bucketId).subscribe(bucketlist => {
        this.bucketlistItems = bucketlist.items;
        },
        error => this.errorMessage = <any> error);

    }

    onBack(): void {
        this._router.navigate(['/bucketlists'], {queryParams : {page: 1, limit: 2}});
    }

    addItem() {
        // Adds an item to a bucketlist
        this.itemService.createItem(this.bucketId, this.model)
        .subscribe(items => {
            this.bucketlistItems = items;
            this.alertService.success('Item added');
            this.ngOnInit();
            this.model.name = '';
        },
        error => {
            this.alertService.error('Please try again');
            this.ngOnInit();
            this.model.name = '';
        });
    }
    setItemId(itemId) {
        this.itemId = itemId;
    }
    updateItemName(itemId) {
        // Updates a bucketlist item
        const bucketId = + this._route.snapshot.params['bucketId'];
        this.itemService.updateItemName(bucketId, itemId, this.model)
        .subscribe(
            data => {
                this.alertService.success('Item updated successfully', false);
                this.model = '';
                this.refreshPage();

            },
            error => {
                this.alertService.error('Please try again', false);
                this.refreshPage();
            });
        }
    updateItemDone(itemId, itemDone) {
        const bucketId = + this._route.snapshot.params['bucketId'];
        this.itemService.updateItemDone(bucketId, itemId, itemDone)
        .subscribe(
            data => {
                this.alertService.success('Item updated successfully', false);
                this.getOneBucket();
            },
            error => {
                this.alertService.error('Please try again', false);
                this.getOneBucket();
            });
        }

    deleteItem(itemId) {
        // Deletes item with item id
        const bucketId = this._route.snapshot.params['bucketId'];
        this.itemService.deleteItem(bucketId, itemId)
        .subscribe(
                   items => {
                       this.bucketlistItems = items;
                       this.alertService.success('Item deleted successfully', false);
                       this.getOneBucket();
                   },
                   error => {
                        this.alertService.error('Please try again', false);
                        this.getOneBucket();
                   });
    }
}
