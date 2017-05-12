import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IBucketlist} from '../_models/bucketlist';
import { AlertService } from '../_services/alert.service';
import { BucketlistService} from '../_services/bucketlists.service';

@Component({
    selector: 'bl-bucketlists',
    templateUrl: 'bucketlists.component.html',
    moduleId: module.id,
}
)

export class BucketlistComponent implements OnInit{
    model: any = {};
    loading = false;
    pageTitle: string = 'This are your bucketlists.';
    allBuckets : any=[];
    errorMessage: string;
    bucketlist;
    
    constructor(
        private router: Router,
        private alertService: AlertService,
        private bucketlistService: BucketlistService
    ){}
    ngOnInit(): void{
        this.bucketlistService.getBucketlists().subscribe(bucketlists => {
            this.allBuckets = bucketlists[0];
        },
        error => this.errorMessage = <any> error);
    }

    createBucketlist(){
        this.loading = true;
        this.bucketlistService.createBucketlist(this.model)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist created successfully', true);
                this.ngOnInit()
                this.model.name = '';
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists']);
                this.loading = false;
            });
    }
    deleteBucket(bucketId){
        this.loading=true;
        this.bucketlistService.deleteBucketlist(bucketId)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist deleted successfully', true);
                this.ngOnInit()
                this.model.name = '';
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists']);
                this.loading = false;
            });
    }
    getOneBucket(bucketId){
        this.bucketlistService.getOneBucketlist(bucketId).subscribe(bucketlist => {
            this.bucketlist = bucketlist;
            console.log("hkjfuaikhnfakngakjngakjgn", this.bucketlist)
            this.router.navigate(['/bucketlists/:id', bucketId])
        },
        error => this.errorMessage = <any> error);
    }

}