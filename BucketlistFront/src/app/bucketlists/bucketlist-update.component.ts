import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { BucketlistService} from '../_services/bucketlists.service';
@Component({
    selector: 'bl-update',
    moduleId: module.id,
    templateUrl:'bucketlist-update.component.html'
})
export class BucketlistUpdateComponent{
    model: any = {};
    loading = false;
    pageTitle: string = "Update Bucketlist";
    errorMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private bucketlistService: BucketlistService
    ){}
    updateBucket(bucketid){
        this.loading = true;
        let bucketId = + this._route.snapshot.params['bucketId'];
        this.bucketlistService.updateBucketlist(bucketId, this.model)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist updated successfully', true);
                this.router.navigate(['/bucketlists']);
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists']);
                this.loading = false;
            });
        }
}