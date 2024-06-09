import { Routes } from '@angular/router';
import { GuardFormComponent } from './guard-form.component';
import { formDirtyGuard } from '../../core/auth/guards/form-dirty.guard';


export const guardForm: Routes = [
  {
    path: 'guardForm',
    component: GuardFormComponent,
    canDeactivate: [formDirtyGuard]
  },
];
