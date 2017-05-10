import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/user';

@Injectable()
export class RegisterService{

    constructor(private http: Http, private config: AppConfig){}
    createNew(user: User){
        let body = {
            'email':user.email,
            'first_name' : user.firstName,
            'last_name': user.lastName,
            'username': user.username,
            'password': user.password
        }
        let header = this.makeHeader();
        return this.http.post(this.config.apiUrl + '/auth/register', body, {headers: header} );
    }

    private makeHeader (){
        let head = new Headers ();
        head.append('Content-Type', 'application/json');
        head.append('Access-Control-Allow-Origin', '*');
        return head;
    }
}   