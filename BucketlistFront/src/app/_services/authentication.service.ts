import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';
@Injectable()
export class AuthenticationService{
    userToken: string;

    constructor (private http: Http, private config: AppConfig){}

    login (email: string, password: string){
        let header = this.makeHeader()
        return this.http.post(this.config.apiUrl + '/auth/login', {email:email, password:password}, { headers: header})
        .map((response: Response) => {
            let loginResponse = response.json();
            this.userToken = loginResponse.auth_token;
            if (loginResponse && this.userToken){

                localStorage.setItem('currentUser', JSON.stringify(loginResponse.auth_token))
            }
        });
    }
    private makeHeader (){
        let head = new Headers ();
        head.append('Content-Type', 'application/json');
        head.append('Access-Control-Allow-Origin', '*');
        return head;
    }
}
