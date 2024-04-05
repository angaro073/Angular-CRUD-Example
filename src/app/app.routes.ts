import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post/post-form/post-form.component';

export const routes: Routes = [
  { 
    title: 'Post List',
    path: "posts",
    component: PostComponent,
  },
  {
    title: 'Create Post',
    path: "posts/create",
    component: PostFormComponent
  },
  {
    title: 'Show Post',
    path: "posts/:id",
    component: PostFormComponent
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
