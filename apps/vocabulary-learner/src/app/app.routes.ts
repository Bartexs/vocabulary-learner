import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PracticeModeComponent } from './components/practice-mode.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'practice', component: PracticeModeComponent }
];
