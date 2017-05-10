import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { RegisterService } from '../_services/register.service';
@Component({
    selector: 'bl-register',
    moduleId: module.id,
    templateUrl: 'register.component.html',
    
})
export class RegisterComponent{
    model: any = {};
    loading = false;
    pageTitle: string = 'Register';
    firstName: string;

    constructor (
        private router: Router,
        private registerService: RegisterService,
        private alertService: AlertService){}

    register(){
        this.loading = true;
        this.registerService.createNew(this.model)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error =>{
                this.alertService.error('Please try again', true);
                this.loading = false;
            });
    }
}