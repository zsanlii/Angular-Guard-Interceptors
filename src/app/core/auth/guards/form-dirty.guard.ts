import type { CanDeactivateFn } from '@angular/router';
import { GuardFormComponent } from '../../../features/guard-form/guard-form.component';

export const formDirtyGuard: CanDeactivateFn<GuardFormComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.isDirty()) {
    
    return confirm('Formunuzda yapılmış değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?');
  }

 
  return true;
};

