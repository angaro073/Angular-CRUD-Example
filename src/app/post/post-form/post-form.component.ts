import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
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
  protected postId: string | null;
  protected submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
    });

    this.postId = this.route.snapshot.paramMap.get('id');
//
console.log('route: ' + this.route.snapshot);
console.log('post_id: ' + this.postId);
//
    if (this.postId) {
      // PostHttpServices
    }
  }
  
  protected get control(): { [key: string ]: AbstractControl} {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value, null, 2));
      if (this.postId) {
        // Update request
      } else {
        // Create request
      }
    }
  }
}