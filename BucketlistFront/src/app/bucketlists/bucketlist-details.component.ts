import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { IBucketlist} from '../_models/bucketlist';
import { AlertService } from '../_services/alert.service';
import {BucketlistService } from '../_services/bucketlists.service';

@Component({
    templateUrl: 'bucketlist-detail.component.html'
})
export class BucketlistDetailComponent implements OnInit{
    pageTitle: "This one bucketlist";
    bucketlist: IBucketlist;
    errorMessage: string;
    model:any = {};

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private alertService: AlertService,
                private bucketlistService: BucketlistService){}
    ngOnInit(){
        let id = + this._route.snapshot.params['id'];
        this.bucketlistService.getOneBucketlist(id).subscribe(bucketlist => {
        this.bucketlist = bucketlist;
        console.log(this.bucketlist)
        },
        error => this.errorMessage = <any> error);
    }

    onBack(): void{
        this._router.navigate(['/bucketlists']);
    }
}
