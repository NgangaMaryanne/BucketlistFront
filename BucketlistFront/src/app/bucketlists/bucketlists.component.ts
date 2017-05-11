import { Component, OnInit } from '@angular/core';
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

export class BucketlistComponent {
    model: any = {};
    loading = false;
    pageTitle: string = 'This are your bucketlists.';
    bucketlists : IBucketlist[];
    errorMessage: string;


    constructor(
        private router: Router,
        private alertService: AlertService,
        private bucketlistService: BucketlistService
    ){}
    ngOnInit(): void{
        this.bucketlistService.getBucketlists().subscribe(bucketlists => {
            this.bucketlists = bucketlists;
        },
        error => this.errorMessage = <any> error);
    }

    createBucketlist(){
        this.loading = true;
        this.bucketlistService.createBucketlist(this.model)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist created successfully', true);
                this.router.navigate(['/bucketlists']);
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists']);
                this.loading = false;
            });
    }

}