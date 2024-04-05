import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { Post } from '../../posts-http/post';
import { PostsHttpService } from '../../posts-http/posts-http.service';

import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  protected form: FormGroup;
  protected post: Post | null = null;
  protected submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private PostsHttpService : PostsHttpService
  ){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
    });

    let postId = this.route.snapshot.paramMap.get('id');
//
console.log('post_id: ' + postId);
//
    if (postId) {
      console.log("Loading posts...");
      this.PostsHttpService.getPost(postId).subscribe((data) => {
        this.post = data
        this.form.controls['title'].setValue(this.post.title);
//
console.log(this.form.value);
//
      });
    }
  }
  
  protected get control(): { [key: string ]: AbstractControl} {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
//
console.log(JSON.stringify(this.form.value, null, 2));
//
      if (this.post) {
        // Update request
      } else {
        // Create request
      }
    }
  }
  onReset(): void {
    if (this.post) {
      this.PostsHttpService.deletePost(this.post.id);
    }
  }
}