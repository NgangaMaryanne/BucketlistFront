import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { AppConfig } from '../app.config';
import {IBucketlist} from '../_models/bucketlist';

@Injectable()
export class BucketlistService {
    header = this.makeHeaders();
    constructor (private http: Http, private config: AppConfig){}
    //Gets all bucketlists.
    getBucketlists() :Observable <IBucketlist[]> {
        return this.http.get(this.config.apiUrl + '/api/v1/bucketlists', { headers: this.header})
        .map((response: Response) =><IBucketlist[]>response.json().results)
         .catch(this.handleError);
    }

    //create one bucketlist.
    createBucketlist(newBucketlist: IBucketlist){
        let bucketData = {
            "name": newBucketlist.name
        }
        return this.http.post(this.config.apiUrl + '/api/v1/bucketlists', bucketData,  {headers: this.header});
    }

    //get onse bucketlist.
    getOneBucketlist(bucketId):Observable <IBucketlist> {
        return this.http.get(this.config.apiUrl + '/api/v1/bucketlists/'+bucketId, { headers: this.header})
        .map((response: Response) => <IBucketlist[]>response.json())
         .do(data => console.log('All: ' + JSON.stringify(data)))
         .catch(this.handleError);
    }
    updateBucketlist(bucketId, updatedBucket: IBucketlist){
        let bucketData = {
            "name":updatedBucket.name
        }
        return this.http.put(this.config.apiUrl + '/api/v1/bucketlists/'+ bucketId, bucketData, { headers: this.header})
    }

    deleteBucketlist(bucketId){
        return this.http.delete(this.config.apiUrl + '/api/v1/bucketlists' + bucketId, {headers: this.header})
    }

    private handleError(error:Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private makeHeaders (){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let head = new Headers ();
        head.append('Content-Type', 'application/json');
        head.append('Access-Control-Allow-Origin', '*');
        head.append('Authorization',currentUser );
        return head;
    };
}