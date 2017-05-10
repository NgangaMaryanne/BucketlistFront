import {Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { LoginComponent } from './home/login.component';
import { RegisterComponent } from './home/register.component';
import { AuthGuard } from './_guards/auth.guard';
 
const appRoutes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
