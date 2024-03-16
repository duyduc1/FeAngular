import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadstatusComponent } from './components/uploadstatus/uploadstatus.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component: HomepageComponent
    },
    {
        path: 'resetpass/:userId/:token', component: ResetpassComponent
    },
    {
        path: 'forgotpass', component: ForgotpassComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'upload', component: UploadstatusComponent
    }
];
