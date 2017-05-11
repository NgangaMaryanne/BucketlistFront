import {Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { LoginComponent } from './home/login.component';
import { RegisterComponent } from './home/register.component';
import { BucketlistComponent} from './bucketlists/bucketlists.component';
import {BucketlistDetailComponent} from './bucketlists/bucketlist-details.component';
import { BucketlistDetailGuard } from './_services/bucketlist-guard.service';
import { AuthGuard } from './_guards/auth.guard';
 
const appRoutes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'bucketlists', component: BucketlistComponent},
    {path: 'bucketlists/:id', canActivate: [BucketlistDetailGuard], component: BucketlistDetailComponent},
    
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
