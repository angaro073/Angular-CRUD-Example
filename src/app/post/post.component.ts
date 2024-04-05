import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Post } from '../posts-http/post';
import { PostsHttpService } from '../posts-http/posts-http.service';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  protected posts: Post[] = [];
  displayedColumns: string[] = ['id', 'title', 'views', 'action'];

  constructor(private PostsHttpService : PostsHttpService){
    console.log("Loading posts...");
    this.PostsHttpService.getAllPosts().subscribe((data) => { this.posts = data });
  }
}
