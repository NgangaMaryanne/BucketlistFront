import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IItem } from '../_models/item';
import { AppConfig } from '../app.config';
@Injectable()
export class BucketlistItemService {
    header = this.makeHeaders();
    constructor (private http: Http, private config: AppConfig) {}
    createItem(bucketId, newItem: IItem) {
        const itemData = {
            'name': newItem.name
        };
        return this.http.post(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId + '/items', itemData,
                              {headers: this.header});
    }

    updateItemName(bucketId, itemId, updatedItem: IItem) {
        const Updateditem = {
            'name': updatedItem.name,
        };
         return this.http.put(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId + '/items/' + itemId, Updateditem,
                              {headers: this.header});
    }
    updateItemDone(bucketId, itemId, itemDone) {
        const Updateditem = {
            'done': itemDone
        };
        return this.http.put(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId + '/items/' + itemId, Updateditem,
                             {headers: this.header});
    }

    deleteItem(bucketId, itemId) {
        return this.http.delete(this.config.apiUrl + '/api/v1/bucketlists/' + bucketId + '/items/' + itemId,
                                {headers: this.header});
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
