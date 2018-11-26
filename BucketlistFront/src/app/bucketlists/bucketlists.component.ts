import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IBucketlist} from '../_models/bucketlist';
import { AlertService } from '../_services/alert.service';
import { BucketlistService} from '../_services/bucketlists.service';

@Component({
    selector: 'app-bucketlists',
    templateUrl: 'bucketlists.component.html',
    moduleId: module.id,

}
)

export class BucketlistComponent implements OnInit {
    model: any = {};
    loading = false;
    pageTitle = 'These are your bucketlists.';
    allBuckets: any = [];
    page= 1;
    limit= 20;
    q= '';
    errorMessage: string;
    bucketSearch: string;
    bucketlist;
    bucketId: number;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private bucketlistService: BucketlistService,
        private zone: NgZone
    ) {}
    ngOnInit(): void {
        this.getBucketlists();
    }
    refreshPage() {
        this.zone.runOutsideAngular(() => {location.reload(); });
    }
    getBucketlists() {
        this.route.queryParams
        .subscribe(params => {
            if (params['page']) {
               this.page = + params['page'] ;
            }
            if (params ['limit']) {
                this.limit = + params ['limit'];
            }
            if (params['q']) {
               this.q = params['q'];
            }
            this.bucketlistService.getBucketlists(this.q, this.page, this.limit ).subscribe(bucketlists => {
            if (bucketlists) {
                this.allBuckets = bucketlists[0];
             }
        },
        error => this.errorMessage = <any> error);
        });
    }
    findNext() {
        return this.bucketlistService.getNext();
    }
    findPrev() {
        return this.bucketlistService.getPrevious();
    }

    nextPage() {
        this.router.navigate(['/bucketlists'], {queryParams : {page: this.page + 1, limit: this.limit}});
    }
    previousPage() {
        this.router.navigate(['/bucketlists'], {queryParams : {page: this.page - 1 , limit: this.limit}});
    }

    searchBucketlists() {
        console.log(this.bucketSearch);
        this.router.navigate(['/bucketlists'], {queryParams : {q: this.bucketSearch}});
    }

    createBucketlist() {
        // Creates a bucketlist
        this.loading = true;
        this.bucketlistService.createBucketlist(this.model)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist created successfully');
                this.ngOnInit();
                this.loading = false;
                this.model.name = '';
            },
            error => {
                this.alertService.error('Please try again');
                this.router.navigate(['/bucketlists'], {queryParams : {page: 1, limit: 2}});
                this.loading = false;
            });
    }
    setBucketId(bucketId) {
        this.bucketId = bucketId;
    }

    updateBucket(bucketid) {
        // Updates a the bucketlist name

        this.loading = true;
        this.bucketlistService.updateBucketlist(bucketid, this.model)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist updated successfully');
                this.model = '';
                this.loading = false;
                this.ngOnInit();
            },
            error => {
                this.alertService.error('Please try again');
                this.loading = false;
                this.model = '';
                this.ngOnInit();
            });
        }

    deleteBucket(bucketId) {
        // Deletes a bucketlist
        this.loading = true;
        this.bucketlistService.deleteBucketlist(bucketId)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist deleted successfully');
                this.loading = false;
                this.refreshPage();
            },
            error => {
                this.alertService.error('Please try again');
                this.ngOnInit();
                this.loading = false;
            });
    }
    getOneBucket(bucketId) {
        // Gets one bucketlist
    this.bucketlistService.getOneBucketlist(bucketId).subscribe(bucketlist => {
    this.bucketlist = bucketlist;
    this.router.navigate(['/bucketlists/:id', bucketId]);
    },

    error => this.errorMessage = <any> error);
    }
}
