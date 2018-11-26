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
    nextPage = null;
    prevPage = null;
    constructor (private http: Http, private config: AppConfig) {}
    // Gets all bucketlists.
    getBucketlists(q, page, limit): Observable <IBucketlist[]> {
        return this.http.get(this.config.apiUrl + '/api/v1/bucketlists?q=' + q + '&page=' + page + '&limit=' + limit,
                             { headers: this.header})
        .map((response: Response) => {
             this.nextPage = response.json().nextPage;
            this.prevPage = response.json().previousPage;
            if (<IBucketlist[]>response.json().results) {
                return <IBucketlist[]>response.json().results;
            }
        })
         .catch(this.handleError);
    }

    getNext() {
        return this.nextPage;
    }
    getPrevious() {
        return this.prevPage;
    }

    // create one bucketlist.
    createBucketlist(newBucketlist: IBucketlist) {
        const bucketData = {
            'name': newBucketlist.name
        };
        return this.http.post(this.config.apiUrl + '/api/v1/bucketlists', bucketData,  {headers: this.header});
    }

    // get onse bucketlist.
    getOneBucketlist(bucketId) {
        return this.http.get(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId, { headers: this.header})
        .map((response: Response) => response.json())
         .catch(this.handleError);
    }
    updateBucketlist(bucketId, updatedBucket: IBucketlist) {
        const bucketData = {
            'name': updatedBucket.name
        };
        return this.http.put(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId, bucketData, { headers: this.header});
    }

    deleteBucketlist(bucketId) {
        return this.http.delete(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId, {headers: this.header});
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private makeHeaders () {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const head = new Headers ();
        head.append('Content-Type', 'application/json');
        head.append('Access-Control-Allow-Origin', '*');
        head.append('Authorization', currentUser );
        return head;
    };
}
