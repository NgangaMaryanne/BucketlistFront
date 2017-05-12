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

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private alertService: AlertService,
                private bucketlistService: BucketlistService,
                private itemService: BucketlistItemService){}
    ngOnInit(){
        let bucketId = + this._route.snapshot.params['bucketId'];
        this.bucketlistService.getOneBucketlist(bucketId).subscribe(bucketlist => {
        this.bucketlistItems = bucketlist.items; 
        },
        error => this.errorMessage = <any> error);
    }

    onBack(): void{
        this._router.navigate(['/bucketlists']);
    }

    addItem(){
        let bucketId = this._route.snapshot.params['bucketId'];
        this.itemService.createItem(bucketId, this.model).subscribe(items =>this.bucketlistItems = items)
        this.ngOnInit();
        this.model.name = '';
    }
}
