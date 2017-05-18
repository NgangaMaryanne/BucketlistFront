import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { IBucketlist} from '../_models/bucketlist';
import {IItem } from '../_models/item';
import { AlertService } from '../_services/alert.service';
import {BucketlistService } from '../_services/bucketlists.service';
import { BucketlistItemService } from '../_services/bucketlist-items.service';

@Component({
    templateUrl: 'bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit{
    pageTitle: "This one bucketlist";
    bucketlist: IBucketlist;
    bucketlistItems:any=[];
    errorMessage: string;
    model:any = {};
    bucketId = + this._route.snapshot.params['bucketId'];

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private alertService: AlertService,
                private bucketlistService: BucketlistService,
                private itemService: BucketlistItemService){}
    ngOnInit(){
        this.getOneBucket()
    }
    getOneBucket(){
        this.bucketlistService.getOneBucketlist(this.bucketId).subscribe(bucketlist => {
        this.bucketlistItems = bucketlist.items; 
        },
        error => this.errorMessage = <any> error);

    }

    onBack(): void{
        this._router.navigate(['/bucketlists']);
    }

    addItem(){
        //Adds an item to a bucketlist
        this.itemService.createItem(this.bucketId, this.model).subscribe(items =>this.bucketlistItems = items)
        this.ngOnInit();
        this.model.name = '';
    }
     
    updateItemName(itemId){
        //Updates a bucketlist item
        let bucketId = + this._route.snapshot.params['bucketId'];
        this.itemService.updateItemName(bucketId, itemId, this.model)
        .subscribe(
            data => {
                this.alertService.success('Item updated successfully', true);
                this.getOneBucket()
                this.model='';
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.getOneBucket()
              
            });
        }

     updateItemDone(itemId, itemDone){
        let bucketId = + this._route.snapshot.params['bucketId'];
        this.itemService.updateItemDone(bucketId, itemId, itemDone)
        .subscribe(
            data => {
                this.alertService.success('Item updated successfully', true);
                this.getOneBucket()
                this.model='';
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.getOneBucket()
              
            });
        }

    deleteItem(itemId){
        // Deletes item with item id
        let bucketId = this._route.snapshot.params['bucketId'];
        this.itemService.deleteItem(bucketId, itemId).subscribe(items=> this.bucketlistItems = items);
        this.ngOnInit();
    }
}
