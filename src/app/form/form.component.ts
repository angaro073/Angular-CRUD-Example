import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  protected form: FormGroup;
  protected submitted = false;

  constructor(private formBuilder: FormBuilder){
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
      });
  }
  
  get f(): { [key: string ]: AbstractControl} {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.valid);
    if (!this.form.invalid) console.log(JSON.stringify(this.form.value, null, 2)) 
  }
}