import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    pageTitle: string = 'These are your bucketlists.';
    allBuckets : any=[];
    page: number= 1;
    limit: number =20;
    q: string = '';
    errorMessage: string;
    bucketSearch: string;
    bucketlist;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private bucketlistService: BucketlistService
    ){}
    ngOnInit(): void{
        this.getBucketlists();
    }
    getBucketlists(){
        this.route.queryParams
        .subscribe(params =>{
            if (params['page']){
               this.page =+ params['page'] ;
            }
            if(params ['limit']){
                this.limit =+ params ['limit'];
            }
            if (params['q']){
               this.q = params['q']; 
            }
            this.bucketlistService.getBucketlists(this.q, this.page, this.limit ).subscribe(bucketlists => {
            if(bucketlists){
                this.allBuckets = bucketlists[0];
             }
            else{
                this.alertService.error('No bucketlists found', true);
            }
        },
        error => this.errorMessage = <any> error);
        })
    }
    findNext(){
        return this.bucketlistService.getNext()
    }
    findPrev(){
        return this.bucketlistService.getPrevious()
    }

    nextPage(){
        this.router.navigate(['/bucketlists'], {queryParams : {page:this.page + 1, limit: this.limit}})
    }
    previousPage(){
        this.router.navigate(['/bucketlists'], {queryParams : {page:this.page - 1 , limit: this.limit}})
    }

    searchBucketlists(){
        console.log(this.bucketSearch)
        this.router.navigate(['/bucketlists'], {queryParams : {q:this.bucketSearch}})
    }

    createBucketlist(){
        // Creates a bucketlist
        this.loading = true;
        this.bucketlistService.createBucketlist(this.model)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist created successfully', true);
                this.ngOnInit();
                this.loading = false;
                this.model.name = '';
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists']);
                this.loading = false;
            });
    }

    updateBucket(bucketid){
        //Updates a the bucketlist name
        this.loading = true;
        this.bucketlistService.updateBucketlist(bucketid, this.model)
        .subscribe(
            data => {
                this.model='';
                this.getBucketlists();
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.getBucketlists();
                this.loading = false;
            });
        }

    deleteBucket(bucketId){
        // Deletes a bucketlist
        this.loading=true;
        this.bucketlistService.deleteBucketlist(bucketId)
        .subscribe(
            data => {
                this.alertService.success('Bucketlist deleted successfully', true);
                this.ngOnInit();
                this.loading = false;
                this.model.name = '';
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.router.navigate(['/bucketlists']);
                this.loading = false;
            });
    }
    getOneBucket(bucketId){
        // Gets one bucketlist
    this.bucketlistService.getOneBucketlist(bucketId).subscribe(bucketlist => {
    this.bucketlist = bucketlist;
    this.router.navigate(['/bucketlists/:id', bucketId])
    },
    error => this.errorMessage = <any> error);
    }

}