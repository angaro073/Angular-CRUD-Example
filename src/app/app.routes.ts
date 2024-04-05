import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { 
    title: 'Post List',
    path: "posts",
    component: HomeComponent,
    children: [
      {
        title: 'Create Post',
        path: "create",
        component: FormComponent
      },
      {
        title: 'Show Post',
        path: ":id",
        // component: ,
        children: [
          { title: 'Update Post', path: "update", component: FormComponent }
        ],
      },
    ],
  },
  { 
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    title: 'Error 404',
    path: '**',
    component: PageNotFoundComponent
  },
];
