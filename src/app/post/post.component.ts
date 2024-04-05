import { Component } from '@angular/core';
import { Post } from '../posts-http/post';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, MatTableModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  protected posts: Post[] = [];
  displayedColumns: string[] = ['id', 'title', 'views'];

  constructor(){
    // this.PostsHttpService.getAllPosts().subscribe(data => { this.posts = data }); : Post[]
  }
}
