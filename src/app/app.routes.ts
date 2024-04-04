import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { title: 'Home Page', path: "/home", component: HomeComponent },
  // { title: 'Show Post', path: "/post/:id", component: },
  // { title: 'Create Post', path: "/create", component: },
  // { title: 'Update Post', path: "/update", component: },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { title: 'Error 404', path: '**', component: PageNotFoundComponent },
];
