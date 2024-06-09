import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder, FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { AddCategory } from '../../models/add-category';

@Component({
  selector: 'app-add-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Basit girdiler almak için yardımcı olur.
    ReactiveFormsModule, // Daha ayrıntılı form yapıları kurmamıza yardımcı olur.
  ],
  templateUrl: './add-category-form.component.html',
  styleUrl: './add-category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryFormComponent {
  // FormsModule
  // nameInputValue = '';
  // descriptionInputValue = '';

  // ReactiveFormsModule
  formGroup: FormGroup;
  // new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  // });

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addCategory() {
    const addCategory: AddCategory = {
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
    };
    this.categoriesService.add(addCategory).subscribe({
      complete: () => {
        console.log('Category added');
      },
    });
  }

  onFormSubmit() {
    if (this.formGroup.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.addCategory();
  }
}
