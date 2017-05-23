import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {}

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
            data => {
                this.router.navigate(['/bucketlists'], {queryParams : {page : 1, limit : 2}});
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
}
