import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guard-form',
  standalone: true,
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './guard-form.component.html',
  styleUrl: './guard-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuardFormComponent {
  form: FormGroup;
  originalFormValue: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName:[""],
      lastName:[""]
    });

    this.originalFormValue = this.form.value;
  }

  isDirty(): boolean {
    return JSON.stringify(this.form.value) !== JSON.stringify(this.originalFormValue);
  }
}
 
